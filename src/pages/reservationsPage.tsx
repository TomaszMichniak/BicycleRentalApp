import axios from "axios";
import Navigation from "../components/navigation";
import { useEffect } from "react";

export default function ReservationPage() {
  useEffect(() => {
    (async () => {
        const data= await axios.get("https://localhost:7227/api/Bicycle/Search");
        console.log(data);
    })();
  }, []);
  return (
    <>
      <Navigation></Navigation>
      <h1 className="text-2xl text-center mt-4">Rezerwacje</h1>
    </>
  );
}
