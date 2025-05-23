import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { Guest } from "../types/guestType";
import { Address } from "../types/addressType";
import { MobileForm } from "./mobileForm";
import { DesktopForm } from "./desktopForm";
import { FormDataValues } from "../types/formDataValues";

export const ResponsiveForm = () => {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState<FormDataValues>({
    guest: { firstName: "", lastName: "", email: "", phone: "" },
    address: { street: "", city: "", postalCode: "" },
    paymentMethod: "card",
    deliveryOption: "standard",
  });

  const updateGuest = (data: Partial<Guest>) =>
    setFormData((prev) => ({ ...prev, guest: { ...prev.guest, ...data } }));
  const updateAddress = (data: Partial<Address>) =>
    setFormData((prev) => ({ ...prev, address: { ...prev.address, ...data } }));
  const updatePayment = (
    method: any //TODO: define PaymentMethod type
  ) => setFormData((prev) => ({ ...prev, paymentMethod: method }));
  const updateForm = (data: Partial<FormDataValues>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };
  const handleSubmit = () => {
    console.log("Formularz wysłany:", formData);
  };
  return isMobile ? (
    <MobileForm
      formData={formData}
      updateGuest={updateGuest}
      updateAddress={updateAddress}
      updatePayment={updatePayment}
      updateForm={updateForm}
      handleSubmit={handleSubmit}
    />
  ) : (
    <DesktopForm
      formData={formData}
      updateGuest={updateGuest}
      updateAddress={updateAddress}
      updatePayment={updatePayment}
      updateForm={updateForm}
      handleSubmit={handleSubmit}
    />
  );
};
