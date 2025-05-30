import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckReservationStatus } from "../api/reservation";
import { Reservation } from "../types/reservationType";
import { PaymentStatus } from "../types/paymentType";

export default function ReservationStatus() {
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState<Reservation|null>(null);
  const [error, setError] = useState<string | null>(null);
  const { reservationId } = useParams();
  useEffect(() => {
    (async () => {
      setLoading(true);
      if (reservationId) {
        const result = await CheckReservationStatus(reservationId);
        setReservation(result);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div>Ładowanie statusu płatności...</div>;
  }

  if (error) {
    return <div className="text-red-600">Błąd: {error}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-green-50 rounded shadow text-center">
      {reservation?.payment.status === PaymentStatus.Paid ? (
        <>
          <h1 className="text-3xl font-bold mb-4 text-green-700">
            Płatność zakończona sukcesem!
          </h1>
          <p className="mb-6">
            Dziękujemy za dokonanie płatności. Twoja rezerwacja jest teraz
            potwierdzona.
          </p>
          <a href="/" className="text-green-700 underline hover:text-green-900">
            Powrót do strony głównej
          </a>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4 text-red-700">
            Płatność nie została zakończona
          </h1>
          <p className="mb-6">
            Coś poszło nie tak podczas realizacji płatności. Prosimy spróbować
            ponownie.
          </p>
          <a
            href="/payment"
            className="text-red-700 underline hover:text-red-900"
          >
            Spróbuj ponownie
          </a>
        </>
      )}
    </div>
  );
}
