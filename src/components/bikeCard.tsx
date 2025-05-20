import { useState } from "react";
import { BikesBySize } from "./availableBikes";
import { BikeSize } from "../types/bikeType";

type Props = {
  name: string;
  sizes: BikesBySize;
};

export default function BikeCard({ name, sizes }: Props) {
  const availableSizes = Object.entries(sizes);
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState<BikeSize>(BikeSize.S);
  const exampleBike = sizes[selectedSize]?.bikes[0];
  const availableCount = sizes[selectedSize]?.bikes.length || 0;

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

  const handleAddToCart = () => {
    if (count > availableCount) {
      alert("Za duża ilość!");
      return;
    }

    console.log("Dodano do koszyka:", {
      name,
      size: selectedSize,
      quantity: count,
      bikeId: exampleBike?.id,
    });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value); 
    setSelectedSize(value);
    setCount(1);
  };

  return (
    <div className="mb-6 border-b pb-4 text-gray-700">
      {exampleBike && (
        <div className="flex items-start space-x-4 text-sm mb-4">
          <img
            src={exampleBike.imageUrl}
            alt={exampleBike.name}
            className="w-36 h-36 object-cover rounded-md"
          />
          <div>
            <h3 className="font-bold text-xl mb-1">{exampleBike.name}</h3>
            <p className="mb-2">{exampleBike.description}</p>
            <p className="font-medium">
              Cena za dobę: {exampleBike.pricePerDay} zł
            </p>
          </div>
        </div>
      )}

      <div className="flex items-end justify-between">
        <div>
          <label className="block text-sm font-medium mb-1">
            Wybierz rozmiar:
          </label>
          <select
            className="border rounded px-2 py-1"
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
          Do koszyka
        </button>
      </div>
    </div>
  );
}
