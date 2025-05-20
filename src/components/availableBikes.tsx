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
  const { setRentalPeriod } = useCart();

  useEffect(() => {
    setRentalPeriod(selectedDate); 
  }, [selectedDate]);
  return (
    <section className="max-w-screen-lg mx-auto p-4">
      <h2 className="text-2xl ">Dostępne rowery:</h2>
      {selectedDate[0] && selectedDate[1] && (
        <p className="text-sm text-gray-600 mb-4">
          W okresie: {selectedDate[0].toLocaleDateString()} –{" "}
          {selectedDate[1].toLocaleDateString()}
        </p>
      )}
      {Object.entries(groupedBikes).map(([name, sizes]) => (
        <BikeCard key={name} name={name} sizes={sizes} selectedDate={selectedDate} />
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
