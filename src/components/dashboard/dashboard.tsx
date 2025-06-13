import { useAuth } from "../../context/authContext";
import UnconfirmedReservations from "./unconfirmedReservations";

export default function Dashboard() {
  const { userRole, logout } = useAuth();

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Panel {userRole === "Admin" ? "Administratora" : "Managera"}
        </h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Wyloguj się
        </button>
      </div>

      <section id="dashboard" className="bg-background-third">
        <div className="max-w-screen-xl mx-auto">
          <div className="">
            <UnconfirmedReservations></UnconfirmedReservations>

          </div>
        </div>
      </section>
    </div>
  );
}
