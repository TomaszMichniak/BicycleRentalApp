import {  useState } from "react";
import Cart from "../components/cart";
import Navigation from "../components/navigation";
import ResponsiveForm from "../components/responsiveForm";
import { useCart } from "../context/cartContext";
import { AnimatePresence , motion } from "framer-motion";

export default function CartPage() {
  const [showCart, setShowCart] = useState(true);
  const { cart } = useCart();
  return (
    <>
      <Navigation />
      <AnimatePresence mode="wait">
        {showCart && (
          <motion.div
            key="cart"
            initial={{  x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Cart />
          </motion.div>
        )}
      </AnimatePresence>
      {/* {showCart && <Cart />} */}
      {cart.length > 0 && (
        <ResponsiveForm
          hideCart={() => setShowCart(false)}
          showCart={() => setShowCart(true)}
        />
      )}
    </>
  );
}
