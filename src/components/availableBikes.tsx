import { useEffect } from "react";
import { BikeSize, BikeType } from "../types/bikeType";
import BikeCard from "./bikeCard";
import { useCart } from "../context/cartContext";
export type BikesBySize = Partial<Record<BikeSize, { bikes: BikeType[] }>>;
export type GroupedBikes = Record<string, BikesBySize>;

type Props = {
  bikes: BikeType[];
  selectedDate: [Date | null, Date | null];
};
export default function AvailableBikes({ bikes, selectedDate }: Props) {
  const groupedBikes = groupBikesByNameAndSize(bikes);
  const { setRentalPeriodSafe } = useCart();

  useEffect(() => {
    setRentalPeriodSafe(selectedDate);
  }, [selectedDate]);
  const rentalDays =
    selectedDate[0] && selectedDate[1]
      ? Math.ceil(
          (selectedDate[1].getTime() - selectedDate[0].getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;
  return (
    <section className="max-w-screen-lg mx-auto p-4">
      <h2 className="text-2xl md:text-3xl ">Dostępne rowery:</h2>
      {selectedDate[0] && selectedDate[1] && (
        <p className="text-sm md:text-base text-gray-600 mb-4">
          W okresie:
          <span className="font-bold text-base md:text-lg">
            {" "}
            {selectedDate[0].toLocaleDateString()} –{" "}
            {selectedDate[1].toLocaleDateString()}
          </span>
          {" "}({rentalDays} {rentalDays === 1 ? "dzień" : "dni"})
        </p>
      )}
      {Object.entries(groupedBikes).map(([name, sizes]) => (
        <BikeCard
          key={name}
          name={name}
          sizes={sizes}
          selectedDate={selectedDate}
        />
      ))}
    </section>
  );
}
function groupBikesByNameAndSize(bikes: BikeType[]): GroupedBikes {
  return bikes.reduce((acc: GroupedBikes, bike: BikeType) => {
    if (!acc[bike.name]) {
      acc[bike.name] = {};
    }
    if (!acc[bike.name][bike.size]) {
      acc[bike.name][bike.size] = { bikes: [] };
    }
    acc[bike.name][bike.size]!.bikes.push(bike);
    return acc;
  }, {});
}
