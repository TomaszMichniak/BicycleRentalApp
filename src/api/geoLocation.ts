import { Address } from "../types/addressType";
import { api } from "./axios";

export async function GetCoordinates(address: Address): Promise<{
  lat: number;
  lng: number;
  isWithinDeliveryRange: boolean;
} | null> {
  try {
    const response = await api.post(`/Geolocation/GetCordinates`, address);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania współrzędnych:", error);
    return null;
  }
}
export async function reverseGeocodeCoords(
  lat: number,
  lng: number
): Promise<{
  street: string;
  city: string;
  postalCode: string;
  isWithinDeliveryRange: boolean;
} | null> {
  try {
    const response = await api.post("/Geolocation/GetAddressByCordinates", {
      lat,
      lng,
    });
    console.log("Odpowiedź z reverse geokodowania:", response.data);
    return response.data;
  } catch (error) {
    console.error("Błąd reverse geokodowania:", error);
    return null;
  }
}
