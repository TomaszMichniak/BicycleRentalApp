import { useCart } from "../context/cartContext";
import { BikeSize } from "../types/bikeType";
import { Link } from "react-router-dom";
import TrashIcon from "./icons/trashIcon";
export default function Cart() {
  const { cart, rentalPeriod, removeFromCart, totalCount,rentalDays } = useCart();
  const [start, end] = rentalPeriod;
  return (
    <section className="p-2 max-w-screen-md  mx-auto">
      <h2 className="text-2xl md:text-3xl mb-4">
         Twój koszyk</h2>

      {start && end && cart.length > 0 ? (
         <p className="text-sm md:text-base text-gray-600 mb-4">
          Wypożyczenie od:
          <span className="font-bold text-base md:text-lg">
            {" "}
            {start.toLocaleDateString()} –{" "}
            {end.toLocaleDateString()}
          </span>
          {" "}({rentalDays} {rentalDays === 1 ? "dzień" : "dni"})
        </p>
      ) : (
        <p className="text-gray-500 text-center md:text-lg">
          Wygląda na to, że koszyk jest pusty. Dodaj rowery, przechodząc do
          sekcji{" "}
          <Link to={"/reservations"} className=" cursor-pointer underline">
            Rezerwacje
          </Link>
        </p>
      )}

      {cart.length > 0 && (
        <>
          <ul className="space-y-4 ">
            {cart.map(({ name, size, quantity, pricePerDay, imgURL }) => (
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
                    {pricePerDay} zł/dzień × {quantity} szt. ={" "}
                    {pricePerDay * rentalDays * quantity} zł
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(name, size)}
                  className="text-white px-3 py-1 rounded ml-auto cursor-pointer"
                >
                  <TrashIcon className="w-7 h-7 md:w-9 md:h-9 text-red-500"/>
                </button>
              </li>
            ))}
          </ul>

          {rentalDays > 0 && (
            <div className="mt-6 text-right">
              <p className="text-xl md:text-2xl font-bold">
                Cena całkowita: {totalCount} zł
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
