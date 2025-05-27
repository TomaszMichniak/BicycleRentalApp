import { FormDataValues } from "../types/formDataValues";
import { api } from "./axios";

export async function CreateReservation(data:FormDataValues) {
    try {
      const response = await api.post("/Reservation/CreateReservationWithTransaction",data)
      return response.data;
  } catch (error) {
    throw new Error("Failed to reserve bicycles: " + (error as Error).message);
  }
}