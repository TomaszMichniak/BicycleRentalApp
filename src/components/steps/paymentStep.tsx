import { useState } from "react";
import NextStepButton from "../buttons/nextStepButton";
import PreviousStepButton from "../buttons/previousStepButton";
import ModalAccept from "../modals/modalAccept";

type Props = {
  onBack?: () => void;
  onSubmit: () => void;
};
export default function PaymentStep({ onSubmit, onBack }: Props) {
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showModalCancelPayment, setShowModalCancelPayment] = useState(false);
  const handleOnSubmit = () => {
    //Payment method disabled for now
    setShowModalCancelPayment(true);
    return;
    if (validatePayment()) {
      onSubmit();
    }
  };
  const validatePayment = () => {
    const newErrors: { [key: string]: boolean } = {};
    if (!acceptedTerms) newErrors.acceptedTerms = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="space-y-4">
      <div className="bg-background-main p-4">
        <h2 className="text-4xl text-white">Metody płatności</h2>
      </div>
      <div className="p-6 bg-white rounded shadow">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            readOnly
            type="radio"
            name="paymentMethod"
            value="payu"
            checked
            className="form-radio text-background-main"
          />
          <span className="text-lg font-medium">
            PayU{" "}
            <span className="text-sm text-gray-600">
              (BLIK, karta płatnicza, przelew)
            </span>
          </span>
        </label>
      </div>
      <div className="px-6">
        <div className="flex items-center space-x-2  ">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={acceptedTerms}
            onChange={() => {
              if (errors.acceptedTerms) {
                setErrors((prev) => ({ ...prev, acceptedTerms: false }));
              }
              setAcceptedTerms(!acceptedTerms);
            }}
            className="flex items-center cursor-pointer text-sm text-gray-700 rounded px-2 py-1 "
          />
          <label
            htmlFor="acceptTerms"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Akceptuję{" "}
            <a
              href="/regulamin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background-main underline"
            >
              regulamin
            </a>
          </label>
        </div>
        {errors.acceptedTerms && (
          <p className="text-red-500 text-sm mb-1">
            Musisz zaakceptować regulamin, aby kontynuować.
          </p>
        )}
      </div>
      <div className="flex gap-2">
        {onBack && <PreviousStepButton onBack={onBack} message="<" />}

        <NextStepButton
          message="Przejdź do płatności"
          onNext={handleOnSubmit}
        />
      </div>
         {showModalCancelPayment && (
              <ModalAccept
                message="Płatności online są obecnie wyłączone. W celu dokonania rezerwacji oraz uzyskania dodatkowych informacji prosimy o kontakt telefoniczny z obsługą klienta"
                onAccept={() => setShowModalCancelPayment(false)}
                acceptLabel="Rozumiem"
              />
            )}
    </div>
  );
}
