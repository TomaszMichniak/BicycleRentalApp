import Calendar, { CalendarProps } from "react-calendar";

type Props = {
  value: [Date | null, Date | null];
  onChange: CalendarProps["onChange"];
  tomorrowStart: Date;
};
export default function DatePicker({ value, onChange, tomorrowStart }: Props) {
  return (
    <div className=" w-full bg-white md:max-w-screen-sm mx-auto p-4 ">
      <Calendar
        minDate={tomorrowStart}
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
