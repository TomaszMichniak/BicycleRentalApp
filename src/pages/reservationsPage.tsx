import axios from "axios";
import Navigation from "../components/navigation";
import { useEffect, useState } from "react";
import DatePicker from "../components/datePicker";
import { CalendarProps } from "react-calendar";
import { BikeType } from "../types/bikeType";
import AvailableBikes from "../components/availableBikes";
type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece];
export default function ReservationPage() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [value, setValue] = useState<Value>([tomorrow, tomorrow]);
  const [bikes, setBikes] = useState<BikeType[]>([]);
  useEffect(() => {
    (async () => {
      if (Array.isArray(value) && value.length === 2) {
        // TODO
        const data = await axios.get(
          `https://localhost:7227/api/Bicycle/GetAvailableByDate?StartDate=${value[0]?.toISOString()}&EndDate=${value[1]?.toISOString()}`
        );
        console.log(data);
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
      <DatePicker tomorrow={tomorrow} value={value} onChange={onChange} />
      <AvailableBikes bikes={bikes} selectedDate={value} />
    </>
  );
}
