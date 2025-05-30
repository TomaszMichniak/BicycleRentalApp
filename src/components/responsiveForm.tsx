import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { Guest } from "../types/guestType";
import { Address } from "../types/addressType";
import { MobileForm } from "./mobileForm";
import { DesktopForm } from "./desktopForm";
import { FormDataValues } from "../types/formDataValues";
import { useCart } from "../context/cartContext";
import { CreateReservationWithPayment } from "../api/reservation";

export const ResponsiveForm = () => {
  const isMobile = useIsMobile();
  const { cart, rentalPeriod, totalCount } = useCart();
  const [formData, setFormData] = useState<FormDataValues>({
    totalPrice: totalCount,
    startDate: rentalPeriod[0] || new Date(),
    endDate: rentalPeriod[1] || new Date(),
    guest: { firstName: "", lastName: "", email: "", phone: "" },
    address: {
      street: "",
      city: "",
      postalCode: "",
      type: null,
    },
    paymentMethod: "card",
    bicycles: cart,
  });
  const updateGuest = (data: Partial<Guest>) =>
    setFormData((prev) => ({ ...prev, guest: { ...prev.guest, ...data } }));
  const updateAddress = (data: Partial<Address>) =>
    setFormData((prev) => ({ ...prev, address: { ...prev.address, ...data } }));
  const updateForm = (data: Partial<FormDataValues>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };
  const handleSubmit = async () => {
    await CreateReservationWithPayment(formData);
    console.log("Formularz wysłany:", formData);
  };
  return isMobile ? (
    <MobileForm
      formData={formData}
      updateGuest={updateGuest}
      updateAddress={updateAddress}
      updateForm={updateForm}
      handleSubmit={handleSubmit}
    />
  ) : (
    <DesktopForm
      formData={formData}
      updateGuest={updateGuest}
      updateAddress={updateAddress}
      updateForm={updateForm}
      handleSubmit={handleSubmit}
    />
  );
};
