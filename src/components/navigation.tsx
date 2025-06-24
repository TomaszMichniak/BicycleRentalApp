import { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import CartIcon from "./icons/cartIcon";
import { AnimatePresence, motion } from "framer-motion";
import MenuIcon from "./icons/menuIcon";
export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuVariants = {
    hidden: { height: 0, opacity: 0, transition: { duration: 0.2 } },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <nav className="bg-background-grey/95 h-16 sticky top-0 z-10 ">
      <div
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex justify-end items-center p-4 md:hidden"
      >
       <MenuIcon className="w-8 h-8 text-background-main"></MenuIcon>
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
              to={`/#o-nas`}
              className="block hover:text-background-main"
            >
              O nas
            </HashLink>
          </li>
          <li>
            <HashLink
              smooth
              to={`/#nasza-oferta`}
              className="block hover:text-background-main"
            >
              Nasza oferta
            </HashLink>
          </li>
          <li>
            <Link
              to={`/rezerwacja`}
              className="block hover:text-background-main"
            >
              Rezerwacja
            </Link>
          </li>
          <li className="flex items-center justify-center">
            <Link to={`/koszyk`} className="block ">
              <CartIcon className="text-background-main h-6 w-6"></CartIcon>
            </Link>
          </li>
        </ul>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-background-grey/95 py-3 overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            <ul className="text-center text-lg flex-row justify-between uppercase  ">
              <li>
                <Link to={`/`} className="block p-2 ">
                  Home
                </Link>
              </li>
              <li>
                <HashLink smooth to={`/#o-nas`} className="block p-2">
                  O nas
                </HashLink>
              </li>
              <li>
                <HashLink smooth to={`/#nasza-oferta`} className="block p-2">
                  Nasza oferta
                </HashLink>
              </li>
              <li>
                <Link to={`/rezerwacja`} className="block p-2 ">
                  Rezerwacja
                </Link>
              </li>
              <li>
                <Link
                  to={`/koszyk`}
                  className="flex items-center p-2 justify-center space-x-2"
                >
                  <CartIcon className="text-background-main h-7 w-7"></CartIcon>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
