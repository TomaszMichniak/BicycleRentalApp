import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="bg-[#262523] h-16 sticky top-0 z-10 ">
      <div
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex justify-end items-center p-4 md:hidden"
      >
        <img src="./src/assets/bars-solid.svg" alt="menu" className="h-8" />
      </div>

      <div className="hidden md:flex max-w-screen-lg min-h-16 mx-auto justify-center items-center text-xl ">
        <ul className=" flex space-x-8 ">
          <li className="">
            <a href="#" className="block hover:text-[#f9d43e]">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block hover:text-[#f9d43e]">
              O nas
            </a>
          </li>
          <li>
            <a href="#" className="block hover:text-[#f9d43e]">
              Nasza oferta
            </a>
          </li> 
          <li>
            <a href="#" className="block hover:text-[#f9d43e]">
              Cennik
            </a>
          </li>
          <li>
            <a href="#" className="block hover:text-[#f9d43e]">
              Rezerwacje
            </a>
          </li>
        </ul>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#262523] opacity-90 py-2 ">
          <ul className="text-center text-m flex-row justify-between space-y-4 uppercase ">
            <li>
              <a href="#" className="block ">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block">
                O nas
              </a>
            </li>
            <li>
              <a href="#" className="block">
                Nasza oferta
              </a>
            </li>  
            <li>
              <a href="#" className="block">
                Cennik
              </a>
            </li>
            <li>
              {" "}
              <a href="#" className="block">
                Rezerwacje
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
