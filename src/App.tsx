import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/mainPage";
import ReservationPage from "./pages/reservationsPage";
import CartContextProvider from "./context/cartContext";
import CartPage from "./pages/cartPage";
import { ReservationContextProvider } from "./context/reservationContext";
import ReservationStatusPage from "./pages/reservationStatusPage";

function App() {
  alert("TODO DeliveryHours")
  return (
    <ReservationContextProvider>
      <CartContextProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/reservations" element={<ReservationPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/reservations/status/:reservationId" element={<ReservationStatusPage />} />
        </Routes>
      </CartContextProvider>
    </ReservationContextProvider>
  );
}

export default App;
