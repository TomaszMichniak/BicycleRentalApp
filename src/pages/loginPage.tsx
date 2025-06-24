import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { Login } from "../api/auth";
import { jwtDecode } from "jwt-decode";
import Navigation from "../components/navigation";
import AuthForm from "../components/dashboard/authForm";
export default function LoginPage() {
  const { authenticate,isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleLogin = async (email:string,password:string) => {
    try {
      const token = await Login(email, password);

      const decoded: any = jwtDecode(token);

      const userRole: "Admin" | "Manager" =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      if (!userRole) {
        setError("Nie udało się odczytać roli z tokena");
        return;
      }

      authenticate(token, userRole);
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { error: errorCode } = error.response.data;
        if (errorCode === "Invalid data") {
          setError("Nieprawidłowe dane logowania");
        }
      }
    }
  };
  return (
    <>
      <Navigation></Navigation>
      <AuthForm onSubmit={handleLogin} isLogin={isAuthenticated} error={error}></AuthForm>
      
    </>
  );
}
