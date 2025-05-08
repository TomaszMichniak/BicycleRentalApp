import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/mainPage";
import ReservationPage from "./pages/reservationsPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/reservations" element={<ReservationPage />} />
      </Routes>
  );
}

export default App;
