import { api } from "./axios";

export async function GetAvailableBicyclesByDate(
  startDate: Date,
  endDate: Date
) {
  try {
    const response = await api.get(
      `/Bicycle/GetAvailableByDate?StartDate=${startDate.toISOString()}&EndDate=${endDate.toISOString()}`
    );
    return response.data.items;
  } catch (error) {
    throw new Error("Failed to fetch available bicycles");
  }
}
