import { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import CartIcon from "./icons/cartIcon";
export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="bg-background-grey/95 h-16 sticky top-0 z-10 ">
      <div
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex justify-end items-center p-4 md:hidden"
      >
        <img src="./src/assets/bars-solid.svg" alt="menu" className="h-8" />
      </div>

      <div className="hidden md:flex max-w-screen-lg min-h-16 mx-auto justify-center items-center text-xl ">
        <ul className=" flex space-x-8 ">
          <li className="">
            <Link to={`/`} className="block hover:text-background-main">
              Home
            </Link>
          </li>
          <li>
            <HashLink
              smooth
              to={`/#aboutUs`}
              className="block hover:text-background-main"
            >
              O nas
            </HashLink>
          </li>
          <li>
            <HashLink
              smooth
              to={`/#ourOffer`}
              className="block hover:text-background-main"
            >
              Nasza oferta
            </HashLink>
          </li>
          <li>
            <Link to={`/reservations`} className="block hover:text-background-main">
              Rezerwacje
            </Link>
          </li>
          <li className="flex items-center justify-center">
            <Link
              to={`/cart`}
              className="block "
            >
              <CartIcon className="text-background-main h-6 w-6"></CartIcon>
            </Link>
          </li>
        </ul>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#262523] opacity-90 py-2 ">
          <ul className="text-center text-m flex-row justify-between space-y-4 uppercase ">
            <li>
              <Link to={`/`} className="block ">
                Home
              </Link>
            </li>
            <li>
              <HashLink smooth to={`/#aboutUs`} className="block">
                O nas
              </HashLink>
            </li>
            <li>
              <HashLink smooth to={`/#ourOffer`} className="block">
                Nasza oferta
              </HashLink>
            </li>
            <li>
              <HashLink smooth to={`/#price-list`} className="block">
                Cennik
              </HashLink>
            </li>
            <li>
              <Link to={`/reservations`} className="block">
                Rezerwacje
              </Link>
            </li>
            <li>
              <Link
                to={`/cart`}
                className="flex items-center justify-center space-x-2"
              >
                <CartIcon className="text-background-main h-5 w-5"></CartIcon>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
