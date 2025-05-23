import Cart from "../components/cart";
import Navigation from "../components/navigation";
import { ResponsiveForm } from "../components/responsiveForm";

export default function CartPage() {
  return (
    <>
      <Navigation />
      <Cart />
      <ResponsiveForm />
    </>
  );
}
