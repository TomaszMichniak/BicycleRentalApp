import { Address } from "./addressType";
import { Guest } from "./guestType";

export type FormDataValues = {
  guest: Guest;
  address: Address;
  paymentMethod: string;
  deliveryOption: string;
  // paymentMethod: PaymentMethod;
};
