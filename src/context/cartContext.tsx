import { BikeSize } from "../types/bikeType";
import { createContext, useContext, useState } from "react";
import { CartItem } from "../types/cartItemType";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type CartContextValue = {
  cart: CartItem[];
  rentalPeriod: [Date | null, Date | null];
  setRentalPeriod: (period: [Date | null, Date | null]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (name: string, size: BikeSize) => void;
  clearCart: () => void;
};
export const CartContext = createContext<CartContextValue>({
  cart: [],
  rentalPeriod: [null, null],
  setRentalPeriod: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
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
    tomorrowStart,
  ]);
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
  return (
    <CartContext.Provider
      value={{
        cart,
        rentalPeriod,
        setRentalPeriod: setRentalPeriodSafe,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
