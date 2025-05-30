import { Address, AddressType } from "../../types/addressType";
import { FormDataValues } from "../../types/formDataValues";
import { useEffect, useState } from "react";
import LocationFetcher from "../locationFetcher";
import { useIsMobile } from "../../hooks/useIsMobile";
import { GetCoordinates, reverseGeocodeCoords } from "../../api/geoLocation";
import { GetPickupLocations } from "../../api/address";

type Props = {
  data: Address;
  onChange: (data: Partial<Address>) => void;
  updateForm: (data: Partial<FormDataValues>) => void;
  onBack?: () => void;
  onNext?: () => void;
};

export default function DeliveryStep({
  data,
  onBack,
  onChange,
  onNext,
}: Props) {
  const [inputChanged, setInputChanged] = useState(false);
  const isMobile = useIsMobile();
  const [selectedPickup, setSelectedPickup] = useState("");
  const [deliveryAllowed, setDeliveryAllowed] = useState<boolean | null>(null);
  const [pickupLocations, setPickupLocations] = useState<Address[]>([]);

  useEffect(() => {
    async function loadPickupLocations() {
      const locations = await GetPickupLocations();
      if (locations.length === 0) {
        alert("Nie udało się załadować lokalizacji odbioru.");
      } else {
        setPickupLocations(locations);
      }
    }

    if (data.type === AddressType.PickupPoint) {
      loadPickupLocations();
    }
  }, [data.type]);

  useEffect(() => {
    if (selectedPickup) {
      const pickupData = pickupLocations.find(
        (loc) => loc.id === selectedPickup
      );
      if (pickupData) {
        onChange({
          id: pickupData.id,
          street: pickupData.street,
          city: pickupData.city,
          postalCode: pickupData.postalCode,
          type: AddressType.PickupPoint,
        });
      }
    } else if (data.type === AddressType.PickupPoint) {
      onChange({
        id: undefined,
        street: "",
        city: "",
        postalCode: "",
        type: AddressType.PickupPoint,
      });
    }
  }, [selectedPickup, pickupLocations]);

  const handleCheckAddress = async () => {
    if (
      data.type === AddressType.GuestAddress &&
      data.street &&
      data.city &&
      data.postalCode
    ) {
      const fullAddress: Address = {
        ...data,
        type: AddressType.GuestAddress,
      };
      const result = await GetCoordinates(fullAddress);
      if (result) {
        setDeliveryAllowed(result.isWithinDeliveryRange);
      } else {
        setDeliveryAllowed(false);
      }
      setInputChanged(false);
    }
  };

  const handleSelect = (type: AddressType) => {
    onChange({
      type,
      ...(type !== AddressType.PickupPoint ? {} : { id: undefined }),
    });
    if (type !== AddressType.PickupPoint) {
      setSelectedPickup("");
    }
  };

  const handleGetLocation = async (lat: number, lng: number) => {
    const result = await reverseGeocodeCoords(lat, lng);
    if (result) {
      onChange({
        street: result.street,
        city: result.city,
        postalCode: result.postalCode,
        type: AddressType.GuestAddress,
      });
      setDeliveryAllowed(result.isWithinDeliveryRange);
    }
  };

  const handleOnChangeInputs = () => {
    setInputChanged(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Wybierz sposób dostawy</h2>

      <div className="flex flex-col space-y-3">
        {/* === Odbiór osobisty === */}
        <button
          type="button"
          onClick={() => handleSelect(AddressType.PickupPoint)}
          className={`w-full flex items-center px-4 py-3 rounded-xl border transition ${
            data.type === AddressType.PickupPoint
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-gray-500 bg-white"
          }`}
        >
          <span className="mr-2">🏪</span>
          Odbiór osobisty
        </button>

        {/* === Kurier === */}
        <button
          type="button"
          onClick={() => handleSelect(AddressType.GuestAddress)}
          className={`w-full flex items-center px-4 py-3 rounded-xl border transition ${
            data.type === AddressType.GuestAddress
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-gray-500 bg-white"
          }`}
        >
          <span className="mr-2">🚚</span>
          Dostawa kurierem
        </button>

        {/* === Szczegóły odbioru osobistego === */}
        {data.type === AddressType.PickupPoint && (
          <div className="ml-4">
            <label className="block text-sm text-gray-700 mb-1">
              Wybierz lokalizację:
            </label>
            <select
              value={selectedPickup}
              onChange={(e) => setSelectedPickup(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
            >
              <option value="">-- Wybierz --</option>
              {pickupLocations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.city} {loc.street}, {loc.postalCode}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* === Szczegóły dostawy kurierem === */}
        {data.type === AddressType.GuestAddress && (
          <div className="mt-4 space-y-4 border border-gray-200 p-4 rounded-lg">
            <h3 className="text-md font-medium">Adres dostawy</h3>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Miejscowość"
                value={data.city}
                onChange={(e) => {
                  onChange({ city: e.target.value });
                  handleOnChangeInputs();
                }}
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="Ulica i numer"
                value={data.street}
                onChange={(e) => {
                  onChange({ street: e.target.value });
                  handleOnChangeInputs();
                }}
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="Kod pocztowy"
                value={data.postalCode}
                onChange={(e) => {
                  onChange({ postalCode: e.target.value });
                  handleOnChangeInputs();
                }}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <button
              type="button"
              onClick={handleCheckAddress}
              className="mt-2 text-sm text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              Sprawdź adres dostawy
            </button>
            {deliveryAllowed && (
              <div className="mt-2 text-sm text-gray-500">Dowozimy.</div>
            )}
            {deliveryAllowed === false && (
              <div className="mt-2 text-sm text-red-500">Nie dowozimy.</div>
            )}
            <LocationFetcher onClick={handleGetLocation} />
          </div>
        )}
        {inputChanged && (
          <div className="mt-2 text-sm text-gray-500">
            Musisz sprawdzić adres dostawy przed kontynuowaniem.
          </div>
        )}
      </div>

       {isMobile && (
        <div className="flex gap-2 pt-4">
          {onBack && (
            <button className="btn" onClick={onBack}>
              Wstecz
            </button>
          )}
          {onNext && (
            <button
              className="btn"
              onClick={onNext}
              disabled={
                data.type === AddressType.GuestAddress &&
                (!deliveryAllowed )
              }
            >
              Dalej
            </button>
          )}
        </div>
      )}
    </div>
  );
}
