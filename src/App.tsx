import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/mainPage";
import ReservationPage from "./pages/reservationsPage";
import CartContextProvider from "./context/cartContext";
import CartPage from "./pages/cartPage";
import { ReservationContextProvider } from "./context/reservationContext";

function App() {
  return (
    <ReservationContextProvider>
      <CartContextProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/reservations" element={<ReservationPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </CartContextProvider>
    </ReservationContextProvider>
  );
}

export default App;
