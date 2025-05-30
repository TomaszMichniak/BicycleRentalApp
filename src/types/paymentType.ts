export type Payment={
  id: string;
  reservationId: string;
  payuOrderId: string;
  status: PaymentStatus
  redirectUrl: string;
  amount: number;
  currency: string;
  createdAt: string;
  paidAt: string;
}
export enum PaymentStatus  {
        Pending, // Utworzona, ale jeszcze nieopłacona
        WaitingForConfirmation,
        Paid,      // Opłacona (potwierdzona przez webhook P24)
        Failed,    // Błąd lub odrzucona
        Refunded,  // Zwrot
        Cancelled  // Anulowana ręcznie lub przez system
};