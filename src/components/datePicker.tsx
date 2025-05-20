import axios from "axios";
import { useEffect, useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";

type Props = {
  tomorrow: Date;
  value: [Date | null, Date | null];
    onChange: CalendarProps["onChange"];
}


export default function DatePicker({tomorrow,value,onChange}:Props) {

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
