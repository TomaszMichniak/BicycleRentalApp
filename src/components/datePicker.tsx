import Calendar, { CalendarProps } from "react-calendar";

type Props = {
  value: [Date | null, Date | null];
  onChange: CalendarProps["onChange"];
  tomorrowStart: Date;
};
export default function DatePicker({ value, onChange, tomorrowStart }: Props) {
  return (
    <div className=" w-full my-6 bg-background-third mx-auto p-4 ">
      <Calendar
        minDate={tomorrowStart}
        prev2Label={null}
        next2Label={null}
        selectRange={true}
        returnValue="range"
        value={value}
        onChange={onChange}
        tileClassName={({ date }) => {
          if (!Array.isArray(value)) return;

          const [start, end] = value;
          const sameDay =
            start && end && start.toDateString() === end.toDateString();
          const dateString = date.toDateString();
          if (sameDay && dateString === start.toDateString()) {
            return "single-day";
          }
          if (start && dateString === start.toDateString()) {
            return "start-day";
          }
          if (end && dateString === end.toDateString()) {
            return "end-day";
          }
        }}
      />
    </div>
  );
}
