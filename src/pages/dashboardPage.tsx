import Dashboard from "../components/dashboard/dashboard";
import DashboardNavigation from "../components/dashboard/dashboardNavigation";
import { useAuth } from "../context/authContext";

export default function DashboardPage() {
  const { userRole } = useAuth();

  return (
    <>
      <DashboardNavigation></DashboardNavigation>
      <Dashboard></Dashboard>
      {userRole == "Admin" && <div></div>}
     
    </>
  );
}
