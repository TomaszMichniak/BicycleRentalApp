import { useCart } from "../context/cartContext";
import { BikeSize } from "../types/bikeType";
import BinIcon from "../assets/trash-solid.svg";
export default function Cart() {
  const { cart, rentalPeriod, removeFromCart, clearCart, totalCount } =
    useCart();
  const [start, end] = rentalPeriod;
  const rentalDays =
    start && end
      ? Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  return (
    <section className="p-2 max-w-screen-md mx-auto">
      <h2 className="text-2xl mb-4">🛒 Koszyk</h2>

      {start && end ? (
        <p className="text-sm text-gray-600 mb-4">
          Wypożyczenie od: <strong>{start.toLocaleDateString()}</strong> do{" "}
          <strong>{end.toLocaleDateString()}</strong> ({rentalDays}{" "}
          {rentalDays === 1 ? "dzień" : "dni"})
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
          <ul className="space-y-4 ">
            {cart.map(({ name, size, quantity, pricePerDay,imgURL }) => (
              <li
                key={`${name}-${size}`}
                className=" flex justify-start bg-white"
              >
                <img
                  src={imgURL}
                  alt={`${name} ${BikeSize[size]}`}
                  className="w-28 h-28 object-cover rounded mr-4"
                />
                <div className="py-2">
                  <p className=" font-bold text-xl">{name}</p>
                  <p className="text-sm text-gray-600">
                    Rozmiar: {BikeSize[size]}
                  </p>
                  <p className="text-sm text-gray-600">
                    {pricePerDay} zł/dzień × {quantity} szt.
                    = {pricePerDay * rentalDays * quantity} zł
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(name, size)}
                  className= "text-white px-3 py-1 rounded ml-auto cursor-pointer"
                >
                  <img src={BinIcon} alt="Usuń" className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>

          {rentalDays > 0 && (
            <div className="mt-6 text-right">
              <p className="text-xl font-bold">Cena całkowita: {totalCount} zł</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
