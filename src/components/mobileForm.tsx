import { useState } from "react";
import { Guest } from "../types/guestType";
import { Address } from "../types/addressType";
import ContactStep from "./steps/contactStep";
import DeliveryStep from "./steps/deliverStep";
import PaymentStep from "./steps/paymentStep";
import { FormDataValues } from "../types/formDataValues";
type Props = {
  formData: FormDataValues;
  updateGuest: (data: Partial<Guest>) => void;
  updateAddress: (data: Partial<Address>) => void;
  updatePayment: (method: any) => void; //TODO: define PaymentMethod type
  updateForm: (data: Partial<FormDataValues>) => void;
  handleSubmit: () => void;
};

export const MobileForm = ({
  formData,
  updateGuest,
  updateAddress,
  updatePayment,
  updateForm,
  handleSubmit,
}: Props) => {
  const [step, setStep] = useState(0);
  return (
    <div className="p-4">
      {step === 0 && (
        <ContactStep
          data={formData.guest}
          onChange={updateGuest}
          onNext={() => setStep(1)}
        />
      )}
      {step === 1 && (
        <DeliveryStep
          data={formData.address}
          deliveryOption={formData.deliveryOption}
          onChange={updateAddress}
          updateForm={updateForm}
          onBack={() => setStep(0)}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <PaymentStep
          value={formData.paymentMethod}
          paymentMethod={formData.paymentMethod}
          onChange={updatePayment}
          onBack={() => setStep(1)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
