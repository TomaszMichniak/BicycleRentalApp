export type Address = {
  id?: string;
  street: string;
  city: string;
  postalCode: string;
  type: AddressType | null;
};
export enum AddressType {
  PickupPoint,
  GuestAddress,
}
