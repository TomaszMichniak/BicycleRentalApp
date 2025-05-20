import { BikeSize } from "./bikeType";

export type CartItem = {
  name: string;
  size: BikeSize;
  quantity: number;
  pricePerDay: number;
};