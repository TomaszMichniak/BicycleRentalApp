import axios from "axios";
import Navigation from "../components/navigation";
import { useEffect } from "react";
import DatePicker from "../components/datePicker";

export default function ReservationPage() {
  // useEffect(() => {
  //   (async () => {
  //       const data= await axios.get("https://localhost:7227/api/Reservation/Search?StartDate=2025-05-19&EndDate=2025-05-22");
  //       console.log(data);
  //   })();
  // }, []);
  return (
    <>
      <Navigation></Navigation>
      <h1 className="text-2xl text-center mt-4">Rezerwacje</h1>
      <DatePicker />
    </>
  );
}
