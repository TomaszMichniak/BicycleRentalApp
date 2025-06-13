import { Address } from "./addressType";
import { BikeType } from "./bikeType";
import { Guest } from "./guestType";
import { Payment } from "./paymentType";

export type Reservation = {
  id: string;
  totalPrice: number;
  isConfirmed: boolean;
  startDate: string; // ISO date string
  endDate: string;
  createdAt: string;
  // guestId: string;
  // addressId: string;
  deliveryHours:string;
  guest:Guest;
  address:Address;
  bicycles: BikeType[];
  payment: Payment;
};
