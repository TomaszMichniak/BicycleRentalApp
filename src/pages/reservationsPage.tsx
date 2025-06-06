import Navigation from "../components/navigation";
import { useEffect, useState } from "react";
import DatePicker from "../components/datePicker";
import { CalendarProps } from "react-calendar";
import { BikeType } from "../types/bikeType";
import AvailableBikes from "../components/availableBikes";
import { useReservationContext } from "../context/reservationContext";
import { GetAvailableBicyclesByDate } from "../api/bicycle";
import LoadingLoop from "../components/modals/loadingLoop";
import ReserationSteps from "../components/reservationSteps";

export default function ReservationPage() {
  const [loadingLoop, setLoadingLoop] = useState(false);
  const { value, setValue } = useReservationContext();
  const tomorrowStart = new Date();
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);
  tomorrowStart.setHours(0, 0, 0, 0);
  const [bikes, setBikes] = useState<BikeType[]>([]);
  useEffect(() => {
    (async () => {
      setLoadingLoop(true);
      if (
        Array.isArray(value) &&
        value.length === 2 &&
        value[0] instanceof Date &&
        value[1] instanceof Date
      ) {
        try {
          const data = await GetAvailableBicyclesByDate(value[0], value[1]);
          setBikes(data);
        } catch (error) {
          console.error("Failed to fetch available bicycles", error);
        }
      }
      setTimeout(() => {
        setLoadingLoop(false);
      }, 300);
    })();
  }, [value]);

  const onChange: CalendarProps["onChange"] = (val) => {
    if (Array.isArray(val) && val.length === 2) {
      setValue(val);
    }
  };
  return (
    <>
      <Navigation></Navigation>
      <h1 className="text-2xl md:text-3xl text-center my-4">Jak to zrobić?</h1>
      <ReserationSteps/>
      <DatePicker
        value={value}
        onChange={onChange}
        tomorrowStart={tomorrowStart}
      />
      <AvailableBikes bikes={bikes} selectedDate={value} />
      {loadingLoop && <LoadingLoop></LoadingLoop>}
    </>
  );
}
