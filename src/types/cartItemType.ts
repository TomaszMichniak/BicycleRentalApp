import { BikeSize } from "./bikeType";

export type CartItem = {
  name: string;
  size: BikeSize;
  pricePerDay: number;
  quantity: number;
};