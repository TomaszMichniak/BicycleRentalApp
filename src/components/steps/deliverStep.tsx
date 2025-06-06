import { Address, AddressType } from "../../types/addressType";
import { FormDataValues } from "../../types/formDataValues";
import { useEffect, useState } from "react";
import LocationFetcher from "../locationFetcher";
import { useIsMobile } from "../../hooks/useIsMobile";
import { GetCoordinates, reverseGeocodeCoords } from "../../api/geoLocation";
import { GetPickupLocations } from "../../api/address";
import DeliveryHours from "./deliveryHours";
import PreviousStepButton from "../buttons/previousStepButton";
import NextStepButton from "../buttons/nextStepButton";
import LoadingLoop from "../modals/loadingLoop";

type Props = {
  errors: { [key: string]: boolean };
  data: Address;
  deliveryHours?: string;
  onChange: (data: Partial<Address>) => void;
  updateForm: (data: Partial<FormDataValues>) => void;
  onBack?: () => void;
  onNext?: () => void;
  setErrors: (errors: { [key: string]: boolean }) => void;
  validateDelivery: () => { [key: string]: boolean };
};

export default function DeliveryStep({
  data,
  errors,
  setErrors,
  deliveryHours,
  onBack,
  onChange,
  onNext,
  updateForm,
  validateDelivery,
}: Props) {
  const isMobile = useIsMobile();
  const [selectedPickup, setSelectedPickup] = useState("");
  const [deliveryAllowed, setDeliveryAllowed] = useState<boolean | null>(null);
  const [pickupLocations, setPickupLocations] = useState<Address[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(
    !(data.type != null)
  );
  const [loadingLoop, setLoadingLoop] = useState(false);
  useEffect(() => {
    if (data.type === AddressType.PickupPoint && data.id && !selectedPickup) {
      setSelectedPickup(data.id);
    }
  }, [data, selectedPickup]);
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
    setLoadingLoop(true);
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
    setLoadingLoop(false);
    return result?.isWithinDeliveryRange;
  };

  const handleSelect = (type: AddressType) => {
    setErrors({ selectedPickupError: false });
    setDeliveryAllowed(null);
    setIsButtonDisabled(false);
    onChange({
      type,
      id: undefined,
      city: "",
      street: "",
      postalCode: "",
    });
    setSelectedPickup("");
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

  const handleOnNext = async () => {
    if (!selectedPickup) {
      setErrors({ selectedPickupError: true });
    }
    if (data.type === AddressType.PickupPoint && !!selectedPickup) {
      onNext?.();
    } else if (data.type === AddressType.GuestAddress) {
      const validationErrors = validateDelivery();
      if (Object.keys(validationErrors).length === 0) {
        const result = await handleCheckAddress();
        if (result) {
          onNext?.();
        }
      }
    }
  };
  return (
    <div className="space-y-6">
      <div className="bg-background-main p-4">
        <h2 className="text-3xl md:text-4xl text-white">
          Wybierz sposób odbioru
        </h2>
      </div>
      <div className="flex flex-col space-y-3 mx-4">
        {/* === Pickup Point === */}
        <button
          type="button"
          onClick={() => handleSelect(AddressType.PickupPoint)}
          className={`w-full flex items-center px-4 py-3 rounded-xl text-lg border  ${
            data.type === AddressType.PickupPoint
              ? "border-background-main bg-background-main text-white"
              : "border-gray-300 hover:border-gray-500 bg-white"
          }`}
        >
          <span className="mr-2">🏪</span>
          Odbiór osobisty
        </button>
        {/* === Details pickup point === */}
        {data.type === AddressType.PickupPoint && (
          <div className="ml-4">
            <label className="block text-sm md:text-base text-gray-600 mb-1">
              Wybierz lokalizację:
            </label>
            <select
              value={selectedPickup}
              onChange={(e) => {
                setErrors({ selectedPickupError: false });
                setSelectedPickup(e.target.value);
              }}
              className={` ${
                errors.selectedPickupError ? " border-red-500" : ""
              }
                w-full border md:text-lg  rounded-lg px-3 py-2 border-gray-500 focus:outline-none focus:ring-1 focus:ring-background-main focus:border-background-main !impo"
                `}
            >
              <option value="">-- Wybierz --</option>
              {pickupLocations.map((loc) => (
                <option className="" key={loc.id} value={loc.id}>
                  {loc.city} {loc.street}, {loc.postalCode}
                </option>
              ))}
            </select>
            <DeliveryHours onChange={updateForm} />
          </div>
        )}

        {/* === Delivery === */}
        <button
          type="button"
          onClick={() => handleSelect(AddressType.GuestAddress)}
          className={`w-full flex items-center px-4 py-3 rounded-xl text-lg border ${
            data.type === AddressType.GuestAddress
              ? "border-background-main bg-background-main text-white"
              : "border-gray-300 hover:border-gray-500 bg-white"
          }`}
        >
          <span className="mr-2">🚚</span>
          Dostawa
        </button>

        {/* === Details delivery === */}
        {data.type === AddressType.GuestAddress && (
          <div className=" space-y-2 px-4 rounded-lg">
            <h3 className=" text-2xl">Adres dostawy</h3>

            <div className="space-y-4">
              <div className="relative w-full">
                <input
                  id="city"
                  type="text"
                  value={data.city}
                  onChange={(e) => {
                    onChange({ city: e.target.value });
                  }}
                  className={`w-full pt-4 px-3 border  rounded text-base md:text-lg focus:outline-none bg-background-gray
                     text-black peer focus:border-background-main focus:ring-1 focus:ring-background-main ${
                       errors.city ? "border-red-500" : "border-gray-500"
                     }`}
                />
                <label
                  htmlFor="city"
                  className={`absolute left-3 top-1 text-xs md:text-sm text-gray-600 peer-focus:text-background-main ${
                    errors.city ? "text-red-500" : "text-gray-600"
                  } `}
                >
                  Miejscowość
                </label>
              </div>

              <div className="relative w-full">
                <input
                  id="street"
                  type="text"
                  value={data.street}
                  onChange={(e) => {
                    onChange({ street: e.target.value });
                  }}
                  className={`w-full pt-4 px-3 border  rounded text-base md:text-lg focus:outline-none bg-background-gray
                     text-black peer focus:border-background-main focus:ring-1 focus:ring-background-main ${
                       errors.street ? "border-red-500" : "border-gray-500"
                     }`}
                />
                <label
                  htmlFor="street"
                  className={`absolute left-3 top-1 text-xs md:text-sm text-gray-600 peer-focus:text-background-main ${
                    errors.street ? "text-red-500" : "text-gray-600"
                  } `}
                >
                  Ulica i numer
                </label>
              </div>

              <div className="relative w-full">
                <input
                  id="postalCode"
                  type="text"
                  value={data.postalCode}
                  onChange={(e) => {
                    onChange({ postalCode: e.target.value });
                  }}
                  className={`w-full pt-4 px-3 border  rounded text-base md:text-lg focus:outline-none bg-background-gray
                     text-black peer focus:border-background-main focus:ring-1 focus:ring-background-main ${
                       errors.postalCode ? "border-red-500" : "border-gray-500"
                     }`}
                />
                <label
                  htmlFor="postalCode"
                  className={`absolute left-3 top-1 text-xs md:text-sm text-gray-600 peer-focus:text-background-main ${
                    errors.postalCode ? "text-red-500" : "text-gray-600"
                  } `}
                >
                  Kod pocztowy
                </label>
              </div>
            </div>
            <DeliveryHours onChange={updateForm} />

            <LocationFetcher onClick={handleGetLocation} />
            {deliveryAllowed === false && (
              <div className="mt-2 text-sm md:text-base text-red-500">
                Obecnie nie prowadzimy dostawy do tego miejsca.
              </div>
            )}
          </div>
        )}
        {errors.type && (
          <div className="mt-2 ml-2 text-sm md:text-base text-red-500">
            Nie wybrano sposobu odbioru.
          </div>
        )}
      </div>
      {loadingLoop && <LoadingLoop></LoadingLoop>}
      {isMobile && (
        <div className="flex gap-2 pt-4">
          {onBack && <PreviousStepButton onBack={onBack} message="<" />}
          {onNext && (
            <NextStepButton
              onNext={handleOnNext}
              message="Przejdz dalej"
              disabled={isButtonDisabled}
            />
          )}
        </div>
      )}
    </div>
  );
}
