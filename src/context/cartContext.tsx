import { BikeSize } from "../types/bikeType";
import { createContext, useContext, useState } from "react";
import { CartItem } from "../types/cartItemType";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type CartContextValue = {
  cart: CartItem[];
  rentalPeriod: [Date | null, Date | null];
  setRentalPeriodSafe: (period: [Date | null, Date | null]) => void;
  setRentalPeriodUnsafe: (period: [Date | null, Date | null]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (name: string, size: BikeSize) => void;
  clearCart: () => void;
  totalCount: number;
  rentalDays: number;
};
export const CartContext = createContext<CartContextValue>({
  cart: [],
  rentalPeriod: [null, null],
  setRentalPeriodSafe: () => {},
  setRentalPeriodUnsafe: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalCount: 0,
  rentalDays: 1,
});
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
export default function CartContextProvider({
  children,
}: AuthContextProviderProps) {
  const tomorrowStart = new Date();
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);
  tomorrowStart.setHours(0, 0, 0, 0);
  const tomorrowEnd = new Date(tomorrowStart);
  tomorrowEnd.setHours(23, 59, 59, 999);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [rentalPeriod, setRentalPeriod] = useState<[Date | null, Date | null]>([
    tomorrowStart,
    tomorrowEnd,
  ]);
  const [start, end] = rentalPeriod;
  const rentalDays =
    start && end
      ? Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      : 0;
  const totalCount = cart.reduce(
    (sum, bike) => sum + bike.pricePerDay * rentalDays * bike.quantity,
    0
  );

  const addToCart = (bikeToAdd: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.name === bikeToAdd.name && item.size === bikeToAdd.size
      );

      if (existingIndex >= 0) {
        const updatedCart = [...prev];

        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + bikeToAdd.quantity,
        };

        return updatedCart;
      } else {
        return [...prev, bikeToAdd];
      }
    });
  };

  const removeFromCart = (name: string, size: BikeSize) => {
    setCart((prev) =>
      prev.filter((item) => !(item.name === name && item.size === size))
    );
  };

  const clearCart = () => {
    setCart([]);
    setRentalPeriod([null, null]);
  };
  const setRentalPeriodSafe = (newPeriod: [Date | null, Date | null]) => {
    if (cart.length > 0) {
      return;
    }
    setRentalPeriod(newPeriod);
  };
  const setRentalPeriodUnsafe = (newPeriod: [Date | null, Date | null]) => {
    setRentalPeriod(newPeriod);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        rentalPeriod,
        setRentalPeriodSafe,
        setRentalPeriodUnsafe,
        addToCart,
        removeFromCart,
        clearCart,
        totalCount,
        rentalDays,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
