import { useState } from "react";
import { BikesBySize } from "./availableBikes";
import { BikeSize } from "../types/bikeType";
import { useCart } from "../context/cartContext";
import CartIcon from "./icons/cartIcon";
import ModalAccept from "./modals/modalAccept";
import { useNavigate } from "react-router-dom";
import { useReservationContext } from "../context/reservationContext";
type Props = {
  name: string;
  sizes: BikesBySize;
  selectedDate: [Date | null, Date | null];
};

export default function BikeCard({ name, sizes, selectedDate }: Props) {
  const { cart, addToCart, rentalPeriod, clearCart, setRentalPeriodUnsafe } =
    useCart();
    const { setValue } = useReservationContext();
  const [startCartDate, endCartDate] = rentalPeriod;
  const availableSizes = Object.entries(sizes);
  const [showModalCart, setShowModalCart] = useState(false);
  const [showModalToMuch, setShowModalToMuch] = useState(false);
  const [showModalDateChange, setShowModalDateChange] = useState(false);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const firstBikeSize = availableSizes[0][1].bikes[0].size;
  const [selectedSize, setSelectedSize] = useState<BikeSize>(firstBikeSize);
  const exampleBike = sizes[selectedSize]?.bikes[0];
  const availableCount = sizes[selectedSize]?.bikes.length || 0;
  const currentQuantityInCart =
    cart.find((item) => item.name === name && item.size === selectedSize)
      ?.quantity || 0;

  const increment = () => {
    if (count < availableCount) {
      setCount((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };
  const handleCancelChangeDate = () => {
    setValue(rentalPeriod);
    setShowModalDateChange(false);
  };
  const handeleAcceptChangeDate = () => {
    clearCart();
    setRentalPeriodUnsafe(selectedDate);
    if (exampleBike) {
      addToCart({
        name,
        size: selectedSize,
        quantity: count,
        pricePerDay: exampleBike.pricePerDay,
        imgURL: exampleBike.imageUrl,
      });
    }
    setShowModalDateChange(false);
    setShowModalCart(true);
  };

  const handleAddToCart = () => {
    const datesChanged =
      startCartDate?.getTime() !== selectedDate[0]?.getTime() ||
      endCartDate?.getTime() !== selectedDate[1]?.getTime();
    if (datesChanged) {
      setShowModalDateChange(true);
      return
    }

    if (!exampleBike) {
      alert("Brak dostępnych rowerów w tym rozmiarze.");
      return;
    }
    if (count + currentQuantityInCart > availableCount) {
      setShowModalToMuch(true);
      return;
    }
    addToCart({
      name,
      size: selectedSize,
      quantity: count,
      pricePerDay: exampleBike.pricePerDay,
      imgURL: exampleBike.imageUrl,
    });
    setShowModalCart(true);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setSelectedSize(value);
    setCount(1);
  };

  return (
    <div className="mb-6 border-b pb-4 text-gray-700">
      {exampleBike && (
        <div className="flex items-start space-x-4 text-sm md:text-base mb-4">
          <img
            src={exampleBike.imageUrl}
            alt={exampleBike.name}
            className="w-36 h-36 object-cover rounded-md"
          />
          <div>
            <h3 className="font-bold text-xl mb-1">{exampleBike.name}</h3>
            <p className="mb-2">{exampleBike.description}</p>
            <p className="font-medium">
              Cena za dobę:{" "}
              <span className="font-bold">{exampleBike.pricePerDay} zł</span>
            </p>
          </div>
        </div>
      )}
      <div className="flex items-end justify-between">
        <div>
          <label className="block text-sm md:text-base font-medium mb-1">
            Wybierz rozmiar:
          </label>
          <select
            className="border rounded-xl md:text-lg px-2 py-1"
            value={selectedSize}
            onChange={handleSizeChange}
          >
            {availableSizes.map(([size, data]) => {
              return (
                <option key={size} value={size}>
                  {BikeSize[size as keyof typeof BikeSize]} (dost.{" "}
                  {data?.bikes.length} szt.)
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={decrement}
            disabled={count <= 1}
            className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 hover:text-gray-600 hover:border-gray-400 transition disabled:opacity-50"
          >
            <span className="text-xl">−</span>
          </button>
          <span className="text-lg text-gray-500">{count}</span>
          <button
            onClick={increment}
            disabled={count >= availableCount}
            className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 hover:text-gray-600 hover:border-gray-400 transition disabled:opacity-50"
          >
            <span className="text-xl">+</span>
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-background-main p-2 text-white rounded-md"
        >
          <CartIcon className="w-7 h-7 text-white"></CartIcon>
        </button>
      </div>
      {showModalCart && (
        <ModalAccept
          message="Dodano do koszyka! Kontynuujesz zakupy czy przechodzisz do płatności?"
          onCancel={() => setShowModalCart(false)}
          onAccept={() => navigate("/koszyk")}
          acceptLabel="Przejdź do koszyka"
          cancelLabel="Kontynuuj zakupy"
        />
      )}
      {showModalToMuch && (
        <ModalAccept
          message="W Twoim koszyku jest już maksymalna liczba rowerów w tym rozmiarze."
          onAccept={() => setShowModalToMuch(false)}
          acceptLabel="Rozumiem"
        />
      )}
      {showModalDateChange && (
        <ModalAccept
          message="Zmieniono datę wypożyczenia. Czy chcesz kontynuować z nową datą? Obecny koszyk zostanie przy tym wyczyszczony."
          onAccept={handeleAcceptChangeDate}
          onCancel={handleCancelChangeDate}
          acceptLabel="Tak"
          cancelLabel="Nie"
        />
      )}
    </div>
  );
}
