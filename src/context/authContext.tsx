import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  userRole: "Admin" | "Manager"|null;
  token: string | null;
  //refreshToken: string | null;
  isAuthenticated: boolean;
  authenticate: (
    token: string,
    //  refreshToken: string,
    userRole: "Admin" | "Manager"
  ) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"Admin" | "Manager" | null>(null);
  // const [authRefreshToken, setAuthRefreshToken] = useState<string | null>(null);
  function authenticate(
    token: string,
    // refreshToken: string,
    user: "Admin" | "Manager"
  ) {
    setAuthToken(token);
    // setAuthRefreshToken(refreshToken);
    setUserRole(user);
    // AsyncStorage.setItem("token", token);
    // AsyncStorage.setItem("refreshToken", refreshToken);
  }

  function logout() {
    setAuthToken(null);
    // setAuthRefreshToken(null);
    setUserRole(null);
    // AsyncStorage.removeItem("token");
    // AsyncStorage.removeItem("refreshToken");
  }
  const value: AuthContextType = {
    userRole,
    token: authToken,
    //  refreshToken: authRefreshToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
