import { createContext, useContext, useState } from "react";
type ReservationContextType = {
  value: Value;
  setValue: (range: Value) => void;
};
const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);
export const useReservationContext = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error(
      "useReservationContext must be used within a ReservationContextProvider"
    );
  }
  return context;
};
export const ReservationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value, setValue] = useState<Value>(() => {
    const tomorrowStart = new Date();
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);
    tomorrowStart.setHours(0, 0, 0, 0);
    const tomorrowEnd = new Date(tomorrowStart);
    tomorrowEnd.setHours(23, 59, 59, 999);
    return [tomorrowStart, tomorrowEnd];
  });

  return (
    <ReservationContext.Provider value={{ value, setValue }}>
      {children}
    </ReservationContext.Provider>
  );
};
type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece];
