import { useState } from "react";
import { Guest } from "../types/guestType";
import { Address } from "../types/addressType";
import ContactStep from "./steps/contactStep";
import DeliveryStep from "./steps/deliverStep";
import PaymentStep from "./steps/paymentStep";
import { FormDataValues } from "../types/formDataValues";
import { AnimatePresence, motion } from "framer-motion";
import NextStepButton from "./buttons/nextStepButton";

type Props = {
  formData: FormDataValues;
  updateGuest: (data: Partial<Guest>) => void;
  updateAddress: (data: Partial<Address>) => void;
  updateForm: (data: Partial<FormDataValues>) => void;
  handleSubmit: () => void;
  hideCart: () => void;
  showCart: () => void;
  validateContact: () => { [key: string]: boolean };
  validateDelivery: () => { [key: string]: boolean };
  setDeliveryErrors: (errors: { [key: string]: boolean }) => void;
  contactErrors: { [key: string]: boolean };
  deliveryErrors: { [key: string]: boolean };
};

export default function MobileForm({
  formData,
  updateGuest,
  updateAddress,
  updateForm,
  handleSubmit,
  hideCart,
  showCart,
  validateContact,
  validateDelivery,
  setDeliveryErrors,
  contactErrors,
  deliveryErrors,
}: Props) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const nextStep = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (step === 1) {
      showCart();
      setStep(0);
      setDirection(-1);
    } else {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="py-4 relative overflow-hidden">
      {step === 0 && (
        <NextStepButton onNext={() => {
            hideCart();
            nextStep();
          }}
          message="Zamawiam"></NextStepButton>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        {step > 0 && (
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit={step !== 1 ? "exit" : undefined}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <ContactStep
                data={formData.guest}
                onChange={updateGuest}
                onBack={prevStep}
                onNext={nextStep}
                validateContact={validateContact}
                errors={contactErrors}
              />
            )}

            {step === 2 && (
              <DeliveryStep
                data={formData.address}
                onChange={updateAddress}
                updateForm={updateForm}
                onBack={prevStep}
                onNext={nextStep}
                errors={deliveryErrors}
                validateDelivery={validateDelivery}
                setErrors={setDeliveryErrors}
              />
            )}

            {step === 3 && (
              <PaymentStep onBack={prevStep} onSubmit={handleSubmit} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
