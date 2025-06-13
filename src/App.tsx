import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/mainPage";
import ReservationPage from "./pages/reservationsPage";
import CartContextProvider from "./context/cartContext";
import CartPage from "./pages/cartPage";
import { ReservationContextProvider } from "./context/reservationContext";
import ReservationStatusPage from "./pages/reservationStatusPage";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute, PublicOnlyRoute } from "./components/dashboard/protectedRoute";
import DashboardPage from "./pages/dashboardPage";
import LoginPage from "./pages/loginPage";

function App() {
  return (
    <AuthProvider>
      <ReservationContextProvider>
        <CartContextProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<MainPage />} />
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <LoginPage />
                </PublicOnlyRoute>
              }
            />

            {/* Protected route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/reservations" element={<ReservationPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/reservations/status/:reservationId"
              element={<ReservationStatusPage />}
            />
          </Routes>
        </CartContextProvider>
      </ReservationContextProvider>
    </AuthProvider>
  );
}

export default App;
