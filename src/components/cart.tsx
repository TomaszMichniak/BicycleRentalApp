import { useCart } from "../context/cartContext";
import { BikeSize } from "../types/bikeType";

export default function Cart() {
  const { cart, rentalPeriod, removeFromCart, clearCart } = useCart();
  const [start, end] = rentalPeriod;

  const rentalDays =
    start && end ? Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  const total = cart.reduce(
    (sum, bike) => sum + bike.pricePerDay * rentalDays * bike.quantity,
    0
  );

  return (
    <section className="p-4 max-w-screen-md mx-auto">
      <h2 className="text-2xl mb-4">🛒 Koszyk</h2>

      {start && end ? (
        <p className="text-sm text-gray-600 mb-4">
          Wypożyczenie od: <strong>{start.toLocaleDateString()}</strong> do{" "}
          <strong>{end.toLocaleDateString()}</strong> (
          {rentalDays} {rentalDays === 1 ? "dzień" : "dni"})
        </p>
      ) : (
        <p className="text-sm text-red-600 mb-4">
          Wybierz datę wypożyczenia, aby zobaczyć ceny.
        </p>
      )}

      {cart.length === 0 ? (
        <p className="text-gray-500">Koszyk jest pusty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map(({ name, size, quantity, pricePerDay }) => (
              <li
                key={`${name}-${size}`}
                className="border rounded p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-gray-600">Rozmiar: {BikeSize[size]}</p>
                  <p className="text-sm">
                    {pricePerDay} zł/dzień × {rentalDays} dni × {quantity} szt. ={" "}
                    <strong>{pricePerDay * rentalDays * quantity} zł</strong>
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(name, size)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Usuń
                </button>
              </li>
            ))}
          </ul>

          {rentalDays > 0 && (
            <div className="mt-6 text-right">
              <p className="text-xl font-bold">Łącznie: {total} zł</p>
            </div>
          )}

          <div className="mt-4 text-right">
            <button
              onClick={clearCart}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Wyczyść koszyk
            </button>
          </div>
        </>
      )}
    </section>
  );
}
