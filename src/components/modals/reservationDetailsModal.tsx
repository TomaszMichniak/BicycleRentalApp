import { AddressType } from "../../types/addressType";
import { BikeSize } from "../../types/bikeType";
import { Reservation } from "../../types/reservationType";

type Props = {
  reservation: Reservation;
  onClose: () => void;
  onConfirm: (id: string) => void;
  onCancel: (reservatioId: string,payUOrderId:string) => void;
};
export default function ReservationDetailsModal({
  reservation,
  onClose,
  onConfirm,
  onCancel,
}: Props) {
  const { guest, address } = reservation;

  const start = new Date(`${reservation.startDate}`);
  const end = new Date(reservation.endDate);

  const rentalDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  return (
    <div className="fixed inset-0 bg-black/25 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-2xl shadow-lg mx-4 p-6 max-w-sm w-full text-center space-y-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black hover:text-black"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold mb-4 text-background-main">
          Szczegóły rezerwacji #{reservation.id.slice(0, 8).toUpperCase()}
        </h3>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Data:</strong>{" "}
            {new Date(reservation.startDate).toLocaleDateString()} –{" "}
            {new Date(reservation.endDate).toLocaleDateString()}({rentalDays}{" "}
            {rentalDays === 1 ? "dzień" : "dni"})
          </p>
          <p>
            <strong>Kwota:</strong> {reservation.totalPrice.toFixed(2)} zł
          </p>
          <div className="">
            <p>
              <strong>Zamawiający: </strong>
            </p>
              <p>Email: {guest.email}</p>
              <p>
                Imię i nazwisko: {guest.firstName} {guest.lastName}
              </p>
              <p>Tel.: {guest.phone}</p>
          </div>
          <p>
            <strong>Godziny dostawy:</strong> {reservation.deliveryHours}
          </p>
          <p>
            <strong>
              {address.type == AddressType.GuestAddress
                ? "Dostawa:"
                : "Odbiór osobisty:"}
            </strong>{" "}
            {address.city} {address.street} {address.postalCode}
          </p>

          <div>
            <p className="font-semibold mt-2">Rowery:</p>
            <ul className="list-inside list-none">
              {Object.entries(
                reservation.bicycles.reduce((acc, bike) => {
                  const key = `${bike.name}-${bike.size}`;
                  acc[key] = acc[key] || {
                    name: bike.name,
                    size: bike.size,
                    count: 0,
                  };
                  acc[key].count += 1;
                  return acc;
                }, {} as Record<string, { name: string; size: string; count: number }>)
              ).map(([key, { name, size, count }]) => (
                <li key={key}>
                  {name} {BikeSize[size as keyof typeof BikeSize]} – {count}{" "}
                  szt.
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className=" flex space-x-2">
          <button
            onClick={() => onCancel(reservation.id,reservation.payment.payuOrderId)}
            className="text-base text-white bg-[#4f4f4f] ml-4 p-2 rounded"
          >
            Odrzuć rezerwację
          </button>
          <button
            onClick={() => onConfirm(reservation.id)}
            className="w-full mr-4 text-base  text-white p-2 bg-background-main rounded"
          >
            Potwierdź rezerwację
          </button>
        </div>
      </div>
    </div>
  );
}
