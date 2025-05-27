import { Address } from "./addressType";
import { CartItem } from "./cartItemType";
import { Guest } from "./guestType";

export type FormDataValues = {
  totalPrice: number;
  startDate:Date;
  endDate:Date;
  guest: Guest;
  address: Address;
  paymentMethod: string;
  bicycles:CartItem[];
  // paymentMethod: PaymentMethod;
};
