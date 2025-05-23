import { Address } from "../../types/addressType";
import { FormDataValues } from "../../types/formDataValues";
import { useState } from "react";
import LocationFetcher from "../locationFetcher";
import { useIsMobile } from "../../hooks/useIsMobile";
import { GetCoordinates, reverseGeocodeCoords } from "../../api/geoLocation";

type Props = {
  data: Address;
  onChange: (data: Partial<Address>) => void;
  deliveryOption: string;
  updateForm: (data: Partial<FormDataValues>) => void;
  onBack?: () => void;
  onNext?: () => void;
};

const pickupLocations = [
  "Kościelisko ul. Nędzy Kubińca 255",
  "Nowe Bystre 113",
];
export default function DeliveryStep({
  data,
  deliveryOption,
  onBack,
  onNext,
  onChange,
  updateForm,
}: Props) {
  const [inputChanged, setInputChanged] = useState(false);
  const isMobile = useIsMobile();
  const [selectedPickup, setSelectedPickup] = useState("");
  const [deliveryAllowed, setDeliveryAllowed] = useState<boolean | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [loadingCoords, setLoadingCoords] = useState(false);

  const handleCheckAddress = async () => {
    if (
      deliveryOption === "courier" &&
      data.street &&
      data.city &&
      data.postalCode
    ) {
      const fullAddress: Address = {
        street: data.street,
        city: data.city,
        postalCode: data.postalCode,
      };
      const result = await GetCoordinates(fullAddress);
      if (result) {
        setCoords({ lat: result.lat, lng: result.lng });
        setDeliveryAllowed(result.isWithinDeliveryRange);
      } else {
        setDeliveryAllowed(false);
      }
      setInputChanged(false);
    }
  };
  const handleSelect = (option: string) => {
    updateForm({ deliveryOption: option });
    if (option !== "pickup") {
      setSelectedPickup("");
    }
  };
  const handleGetLocation = async (lat: number, lng: number) => {
    const result = await reverseGeocodeCoords(lat, lng);
    console.log("Reverse geocode result:", result);
    if (result) {
      onChange({
        street: result.street,
        city: result.city,
        postalCode: result.postalCode,
      });
      setCoords({ lat, lng });
      setDeliveryAllowed(result.isWithinDeliveryRange);
    }
  };
  const handleOnChangeInputs = () => {
    console.log("Input changed");
    setInputChanged(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Wybierz sposób dostawy</h2>

      <div className="flex flex-col space-y-3">
        {/* === Odbiór osobisty === */}
        <button
          type="button"
          onClick={() => handleSelect("pickup")}
          className={`w-full flex items-center px-4 py-3 rounded-xl border transition ${
            deliveryOption === "pickup"
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-gray-500 bg-white"
          }`}
        >
          <span className="mr-2">🏪</span>
          Odbiór osobisty
        </button>

        {deliveryOption === "pickup" && (
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
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* === Kurier === */}
        <button
          type="button"
          onClick={() => handleSelect("courier")}
          className={`w-full flex items-center px-4 py-3 rounded-xl border transition ${
            deliveryOption === "courier"
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-gray-500 bg-white"
          }`}
        >
          <span className="mr-2">🚚</span>
          Dostawa kurierem
        </button>

        {deliveryOption === "courier" && (
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
              <div className="mt-2 text-sm text-gray-500">
                Dowozimy.
              </div>
            )} 
            {!deliveryAllowed && (
              <div className="mt-2 text-sm text-red-500">
               Nie dowozimy.
              </div>
            )}
            <LocationFetcher onClick={handleGetLocation}></LocationFetcher>
          </div>
        )}
        {inputChanged && (
          <div className="mt-2 text-sm text-gray-500">
            Musisz sprawdzic adres dostawy przed kontynuowaniem.
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
                deliveryOption === "courier" &&
                (!deliveryAllowed || loadingCoords)
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
