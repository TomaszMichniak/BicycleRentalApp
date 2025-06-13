import { FormDataValues } from "../types/formDataValues";
import { Reservation } from "../types/reservationType";
import { api } from "./axios";

export async function CreateReservationWithPayment(data: FormDataValues) {
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
}
export async function CheckReservationStatus(
  reservationId: string
): Promise<Reservation> {
  try {
    const response = await api.get(`/Reservation/Search?Id=${reservationId}`);
    if (response.data.items) {
      return response.data.items[0];
    } else {
      throw new Error("Reservation not found");
    }
  } catch (error) {
    throw new Error("Failed to find reservation: " + (error as Error).message);
  }
}
export async function GetReservationToAccept():Promise<Reservation[]>{
    const response =await api.get("/Reservation/Search?Status=0")
  return response.data.items
}

export async function ConfirmReservation(reservationId: string){
  const response = await api.patch(
    `/Reservation/confirm-reservation/${reservationId}`,
  );
}
export async function RefundReservation(payUOrderId:string,description:string,reservationId:string){
    const response = await api.post(
    `/Payment/refund`,{reservationId,payUOrderId,description}
  );
}