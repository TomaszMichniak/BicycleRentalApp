import { BikeType } from "./bikeType";
import { Payment } from "./paymentType";

export type Reservation = {
  id: string;
  totalPrice: number;
  isConfirmed: boolean;
  startDate: string; // ISO date string
  endDate: string;
  createdAt: string;
  guestId: string;
  addressId: string;
  bicycles: BikeType[];
  payment: Payment;
};
