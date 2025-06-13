import { useState } from "react";
import Cart from "../components/cart";
import Navigation from "../components/navigation";
import ResponsiveForm from "../components/responsiveForm";
import { useCart } from "../context/cartContext";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";
import Footer from "../components/footer";

export default function CartPage() {
  const [showCart, setShowCart] = useState(true);
  const isMobile = useIsMobile();
  const { cart } = useCart();
  return (
       <div className="min-h-screen flex flex-col">
      <Navigation />
       <main className="flex-grow">
      {isMobile && (
        <AnimatePresence mode="popLayout">
          {showCart && (
            <motion.div
              key="cart"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Cart />
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {!isMobile && (
        <Cart />
      )}
      {cart.length > 0 && (
        <ResponsiveForm
          hideCart={() => setShowCart(false)}
          showCart={() => setShowCart(true)}
        />
      )}
      </main>
      <Footer></Footer>
    </div>
  );
}
