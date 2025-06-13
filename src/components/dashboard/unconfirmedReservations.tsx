import { useEffect, useState } from "react";
import {
  ConfirmReservation,
  GetReservationToAccept,
  RefundReservation,
} from "../../api/reservation";
import DetailsButton from "../buttons/detailsButton";
import ReservationDetailsModal from "../modals/reservationDetailsModal";
import { Reservation } from "../../types/reservationType";

export default function UnconfirmedReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  useEffect(() => {
    (async () => {
      const result = await GetReservationToAccept();
      if (result) {
        setReservations(result);
      }
    })();
  }, []);
  const handleOnConfirmReservation = async (id: string) => {
    try {
      await ConfirmReservation(id);
      setSelectedReservation(null);
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== id)
      );
    } catch {
      alert("Nie udało sie potweirdzic rezerwacji");
    }
  };
  const handleOnCancelReservation = async (
    reservationId: string,
    payuOrderId: string
  ) => {
    try {
      const description = `Zwrot za rezerwacje o nr :${reservationId}`;
      await RefundReservation(payuOrderId, description,reservationId);
      setSelectedReservation(null);
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== reservationId)
      );
    } catch {
      alert("Nie udało sie potweirdzic rezerwacji");
    }
  };
  return (
    <div className="">
      {reservations.length === 0 ? (
        <p className="text-gray-500 text-center text-xl">Brak niepotwierdzonych rezerwacji.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full ">
          {reservations.map((res) => (
            <div
              key={res.id}
              className="bg-white w-full h-full p-2 shadow-lg rounded-lg "
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-lg font-medium">
                    Rezerwacja nr: {res.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(res.startDate).toLocaleDateString()} -{" "}
                    {new Date(res.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-600 ">
                    Utworzono: {new Date(res.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <DetailsButton
                message="Szczegóły"
                onClick={() => setSelectedReservation(res)}
              />
              {selectedReservation && (
                <ReservationDetailsModal
                  reservation={selectedReservation}
                  onClose={() => setSelectedReservation(null)}
                  onConfirm={(id) => {
                    handleOnConfirmReservation(id);
                  }}
                  onCancel={(reservatioId,payUOrderId) => {
                    handleOnCancelReservation(reservatioId,payUOrderId);
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
