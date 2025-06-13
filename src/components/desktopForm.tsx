import { form } from "framer-motion/client";
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
  updateForm: (data: Partial<FormDataValues>) => void;
  handleSubmit: () => void;
  validateContact: () => { [key: string]: boolean };
  validateDelivery: () => { [key: string]: boolean };
  setDeliveryErrors: (errors: { [key: string]: boolean }) => void;
  contactErrors: { [key: string]: boolean };
  deliveryErrors: { [key: string]: boolean };
};

export const DesktopForm = ({
  formData,
  updateGuest,
  updateAddress,
  updateForm,
  handleSubmit,
  validateContact,
  validateDelivery,
  setDeliveryErrors,
  contactErrors,
  deliveryErrors,
}: Props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="grid grid-cols-3 gap-6 p-6 mb-10 bg-white rounded-xl shadow-lg max-w-6xl mx-auto"
    >
      <div>
        <ContactStep
          data={formData.guest}
          onChange={updateGuest}
          validateContact={validateContact}
          errors={contactErrors}
        />
      </div>
      <div>
        <DeliveryStep
          data={formData.address}
          onChange={updateAddress}
          updateForm={updateForm}
          validateDelivery={validateDelivery}
          errors={deliveryErrors}
          setErrors={setDeliveryErrors}
          deliveryHours={formData.deliveryHours}
        />
      </div>
      <div>
        <PaymentStep onSubmit={handleSubmit} />
      </div>
    </form>
  );
};
