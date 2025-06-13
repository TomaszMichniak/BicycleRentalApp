import { useState } from "react";
import { Link } from "react-router-dom";

export default function DashboardNavigation(){
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
            <Link to={`/dashboard`} className="block hover:text-background-main">
              Home
            </Link>
          </li>
          <li>
             <Link to={`/dashboard/rezerwacje`} className="block hover:text-background-main">
              Rezerwacje
            </Link>
          </li>
          <li>
               <Link to={`/dashboard/rowery`} className="block hover:text-background-main">
              Rowery
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/adresy`} className="block hover:text-background-main">
              Adresy
            </Link>
          </li>
          <li className="flex items-center justify-center">
            <Link
              to={`/cart`}
              className="block "
            >
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
                <Link to={`/`} className="block ">
                Rezerwacje
              </Link>
            </li>
            <li>
                <Link to={`/`} className="block ">
                Rowery
              </Link>
            </li>
            <li>
              <Link to={`/`} className="block ">
                Adresy
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}