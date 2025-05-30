import { FormDataValues } from "../types/formDataValues";
import { Reservation } from "../types/reservationType";
import { api } from "./axios";

export async function CreateReservationWithPayment(data: FormDataValues) {
  console.log("Creating reservation with payment data:", data);
  try {
    const response = await api.post(
      "/Reservation/CreateReservationWithTransaction",
      data
    );

    const { redirectUri } = response.data.paymentUrl;
    if (redirectUri) {
      window.location.href = redirectUri;
    } else {
      throw new Error("Payment URL not provided");
    }
  } catch (error) {
    throw new Error(
      "Failed to reserve and initiate payment: " + (error as Error).message
    );
  }
}
export async function CheckReservationStatus(
  reservationId: string
): Promise<Reservation> {
  try {
    const response = await api.get(`/Reservation/Search?Id=${reservationId}`);
    if (response.data.items) {
      console.log("Reservation found:", response.data.items[0]);
      return response.data.items[0];
    } else {
      throw new Error("Reservation not found");
    }
  } catch (error) {
    throw new Error(
      "Failed to find reservation: " + (error as Error).message
    );
  }
}
