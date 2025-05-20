import axios from "axios";
import Navigation from "../components/navigation";
import { useEffect, useState } from "react";
import DatePicker from "../components/datePicker";
import { CalendarProps } from "react-calendar";
import { BikeType } from "../types/bikeType";
import AvailableBikes from "../components/availableBikes";
import { useReservationContext } from "../context/reservationContext";

export default function ReservationPage() {
  const{value, setValue}=useReservationContext()
  const tomorrowStart = new Date();
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);
  tomorrowStart.setHours(0, 0, 0, 0);
  const [bikes, setBikes] = useState<BikeType[]>([]);
  useEffect(() => {
    (async () => {
      if (Array.isArray(value) && value.length === 2) {
        // TODO
        const data = await axios.get(
          `https://localhost:7227/api/Bicycle/GetAvailableByDate?StartDate=${value[0]?.toISOString()}&EndDate=${value[1]?.toISOString()}`
        );
        setBikes(data.data.items);
      }
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
      <h1 className="text-2xl text-center mt-4">Rezerwacje</h1>
      <DatePicker  value={value} onChange={onChange} tomorrowStart={tomorrowStart} />
      <AvailableBikes bikes={bikes} selectedDate={value} />
    </>
  );
}
