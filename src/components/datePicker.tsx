import axios from "axios";
import { useEffect, useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece];

export default function DatePicker() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [value, setValue] = useState<Value>([tomorrow, tomorrow]);

  const onChange: CalendarProps["onChange"] = (val) => {
    if (Array.isArray(val) && val.length === 2) {
      setValue(val);
    }
  };
  useEffect(() => {
    (async () => {
      if (Array.isArray(value) && value.length === 2) {
        const data = await axios.get(
          `https://localhost:7227/api/Reservation/Search?StartDate=${value[0]?.toISOString()}&EndDate=${value[1]?.toISOString()}`
        );
        console.log(data);
      }
    })();
  }, [value]);
  return (
    <div className=" w-full bg-white md:max-w-screen-sm mx-auto p-4 ">
      <Calendar
        minDate={tomorrow}
        prev2Label={null}
        next2Label={null}
        selectRange={true}
        returnValue="range"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
