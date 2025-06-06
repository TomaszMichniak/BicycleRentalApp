import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { Guest } from "../types/guestType";
import { Address } from "../types/addressType";
import { DesktopForm } from "./desktopForm";
import { FormDataValues } from "../types/formDataValues";
import { useCart } from "../context/cartContext";
import { CreateReservationWithPayment } from "../api/reservation";
import MobileForm from "./mobileForm";
import ModalAccept from "./modals/modalAccept";
type Props = {
  hideCart: () => void;
  showCart: () => void;
};
export default function ResponsiveForm({ hideCart, showCart }: Props) {
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [contactErrors, setContactErrors] = useState<{
    [key: string]: boolean;
  }>({});
  const [deliveryErrors, setDeliveryErrors] = useState<{
    [key: string]: boolean;
  }>({});
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
    deliveryHours: "08:00 - 09:00",
    bicycles: cart,
  });
  const updateGuest = (data: Partial<Guest>) => {
    const key = Object.keys(data)[0];
    setFormData((prev) => ({
      ...prev,
      guest: { ...prev.guest, ...data },
    }));

    setContactErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key as keyof Guest];
      return newErrors;
    });
  };
  const updateAddress = (data: Partial<Address>) => {
    const key = Object.keys(data)[0] as keyof Address;
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        ...data,
      },
    }));

    setDeliveryErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
    if (key === "type") {
      setDeliveryErrors({});
    }
  };
  const updateForm = (data: Partial<FormDataValues>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };
  const handleSubmit = async () => {
    if (!isMobile) {
      const contactErrs = validateContact();
      const deliveryErrs = validateDelivery();

      setContactErrors(contactErrs);
      setDeliveryErrors(deliveryErrs);

      if (
        Object.keys(contactErrs).length > 0 ||
        Object.keys(deliveryErrs).length > 0
      ) {
        return;
      }
    }
    try {
      await CreateReservationWithPayment(formData);
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { error: errorCode, message } = error.response.data;
        if (errorCode === "AddressResolutionFailed") {
          setModalMessage(
            "Nie udało się przetworzyć adresu. Sprawdź poprawność i spróbuj ponownie."
          );
        } else if (errorCode === "AddressOutOfDeliveryRange") {
          setModalMessage(
            "Adres jest poza zasięgiem dostawy. Proszę wybierz inny adres lub skontaktuj się z nami."
          );
        } else if (errorCode === "BicyclesUnavailable") {
          setModalMessage(
            "Brak dostępnych rowerów. Wybierz inny termin lub lokalizację."
          );
        } else {
          setModalMessage("Wystąpił błąd: " + message);
        }
      } else {
        setModalMessage(
          "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później."
        );
      }
    }
  };
  const validateContact = () => {
    const { firstName, lastName, email, phone } = formData.guest;
    const newErrors: { [key: string]: boolean } = {};

    if (!firstName) newErrors.firstName = true;
    if (!lastName) newErrors.lastName = true;
    if (!email || !email.includes("@")) newErrors.email = true;
    if (!phone || phone.length < 9) newErrors.phone = true;
    setContactErrors(newErrors);
    return newErrors;
  };
  const validateDelivery = () => {
    const { city, street, postalCode, type } = formData.address;
    const newErrors: { [key: string]: boolean } = {};

    if (type == null) newErrors.type = true;
    if (!city) newErrors.city = true;
    if (!street) newErrors.street = true;
    if (!postalCode) {
      newErrors.postalCode = true;
    } else {
      const postalCodeRegex = /^\d{2}-\d{3}$/;
      if (!postalCodeRegex.test(postalCode)) {
        newErrors.postalCode = true;
      }
    }
    setDeliveryErrors(newErrors);
    return newErrors;
  };
  return (
    <>
      {isMobile ? (
        <MobileForm
          formData={formData}
          updateGuest={updateGuest}
          updateAddress={updateAddress}
          updateForm={updateForm}
          handleSubmit={handleSubmit}
          hideCart={hideCart}
          showCart={showCart}
          validateContact={validateContact}
          validateDelivery={validateDelivery}
          contactErrors={contactErrors}
          deliveryErrors={deliveryErrors}
          setDeliveryErrors={setDeliveryErrors}
        />
      ) : (
        <DesktopForm
          formData={formData}
          updateGuest={updateGuest}
          updateAddress={updateAddress}
          updateForm={updateForm}
          handleSubmit={handleSubmit}
          validateContact={validateContact}
          validateDelivery={validateDelivery}
          contactErrors={contactErrors}
          setDeliveryErrors={setDeliveryErrors}
          deliveryErrors={deliveryErrors}
        />
      )}
      {modalMessage && (
        <ModalAccept
          message={modalMessage}
          onAccept={() => setModalMessage(null)}
          acceptLabel="Rozumiem"
        />
      )}
    </>
  );
}
