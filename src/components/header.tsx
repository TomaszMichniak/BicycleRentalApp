import imgMobile from "../assets/DSC_11_640.jpg";
import imgDesktop from "../assets/11.jpg";
import { useIsMobile } from "../hooks/useIsMobile";
export default function Header() {
  const isMobile = useIsMobile();
  const backgroundImage = isMobile ? imgMobile : imgDesktop;
  return (
    <header
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center h-96 md:h-[700px] lg:h-[800px] relative"
    >
      <div className="w-full h-full bg-black/10 absolute  "></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <h1 className="text-2xl md:text-5xl mb-3">
          Wypożyczalnia rowerów elektrycznych
        </h1>
        <p className="text-sm md:text-xl">PM eMountainBikes</p>
      </div>
    </header>
  );
}
