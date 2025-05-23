import { Address } from "../types/addressType";
import { FormDataValues } from "../types/formDataValues";
import { Guest } from "../types/guestType";
import ContactStep from "./steps/contactStep";
import DeliveryStep from "./steps/deliverStep";
import PaymentStep from "./steps/paymentStep";

type Props = {
  formData: FormDataValues;
  updateGuest: (data: Partial<Guest>) => void;
  updateAddress: (data: Partial<Address>) => void;
  updatePayment: (method: any) => void; //TODO: define PaymentMethod type
  updateForm: (data: Partial<FormDataValues>) => void;
  handleSubmit: () => void;
};

export const DesktopForm = ({
  formData,
  updateGuest,
  updateAddress,
  updatePayment,
  updateForm,
  handleSubmit,
}: Props) => {
  return (
    <form className="grid grid-cols-3 gap-6 p-6 bg-white rounded-xl shadow-lg max-w-6xl mx-auto">
      <div>
        <ContactStep data={formData.guest} onChange={updateGuest} />
      </div>
      <div>
        <DeliveryStep
          data={formData.address}
          deliveryOption={formData.deliveryOption}
          onChange={updateAddress}
          updateForm={updateForm}
        />
      </div>
      <div>
        <PaymentStep
          value={formData.paymentMethod}
          paymentMethod={formData.paymentMethod}
          onChange={updatePayment}
          onSubmit={handleSubmit}
        />
      </div>
    </form>
  );
};
