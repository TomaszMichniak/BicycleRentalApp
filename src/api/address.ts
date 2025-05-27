import { Address } from "../types/addressType";
import { api } from "./axios";

export async function GetPickupLocations(
): Promise<Address[]> {
  try {
    const response = await api.get(
      `/Address/Search?addressType=0`
    );
    return response.data.items;
  } catch (error) {
    throw new Error("Failed to fetch pickup locations");
  }
}



