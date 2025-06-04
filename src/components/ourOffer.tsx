import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function OurOffer() {
  const images = [
    "./src/assets/rower-elektryczny-gorski-mtb-rockrider-e-st-500-275.jpg",
    "./src/assets/rower-elektryczny-gorski-mtb-rockrider-e-st-500-275-2.jpg",
    "./src/assets/rower-elektryczny-gorski-mtb-rockrider-e-st-500-275-3.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(0);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const isLeftInView = useInView(leftRef, { once: true, margin: "-200px" });
  const isRightInView = useInView(rightRef, { once: true, margin: "-200px" });
  const handlePrev = () => {
    setDirection(-1);
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setDirection(1);
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const variants = {
    initial: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
    }),
    animate: {
      x: 0,
      transition: { duration: 0.4 },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      transition: { duration: 0.4 },
    }),
  };
  const leftVariants = {
    hidden: { x: -200, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const rightVariants = {
    hidden: { x: 200, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
  };
  useEffect(() => {
    if (isLeftInView) {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [isLeftInView]);
  return (
    <section id="ourOffer" className="bg-background-third py-16">
      <div className="max-w-screen-lg mx-auto p-4 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-black">
          <motion.div
            ref={leftRef}
            className="bg-background-main w-full text-white shadow-lg rounded-lg overflow-hidden"
            variants={leftVariants}
            initial="hidden"
            animate={isLeftInView ? "visible" : "hidden"}
          >
            <div className="relative w-full bg-white overflow-hidden">
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.img
                  key={currentImage}
                  src={images[currentImage]}
                  alt="Rower elektryczny"
                  className="w-full object-cover"
                  custom={direction}
                  variants={variants}
                  initial="hidden"
                  animate="center"
                  exit="exit"
                  loading="eager"
                />
              </AnimatePresence>
              <button
                onClick={handlePrev}
                className="absolute top-0 left-0   h-full text-white p-2"
              >
                ◀
              </button>
              <button
                onClick={handleNext}
                className="absolute top-0 right-0   h-full text-white p-2"
              >
                ▶
              </button>
            </div>
            <div className="p-2">
              <h3 className="text-xl ">MTB Rockrider E-ST 500</h3>
              <p className=" mb-2 text-sm md:text-base">
                Elektryczny rower górski, który łączy moc wspomagania z
                niezawodną konstrukcją MTB. Zaprojektowany z myślą o
                eksplorowaniu szlaków, leśnych tras i pagórkowatych terenów, ten
                rower pozwoli Ci cieszyć się jazdą dłużej, szybciej i z większą
                przyjemnością. Dzięki 3 trybom wspomagania i zasięgowi do 100 km
                możesz pokonywać większe dystanse z lekkością i pewnością.
              </p>
              <h4 className="text-lg  mb-1">Dostępne rozmiary:</h4>
              <ul className="text-sm md:text-base">
                <li>S (150-164 cm)</li>
                <li>M (165-174 cm)</li>
                <li>L (175-184 cm)</li>
                <li>XL (185-200 cm)</li>
              </ul>
            </div>
          </motion.div>
          {/*  */}
          <motion.div
            ref={rightRef}
            className="bg-background-main w-full text-white shadow-lg rounded-lg overflow-hidden"
            variants={rightVariants}
            initial="hidden"
            animate={isRightInView ? "visible" : "hidden"}
          >
            <img
              src="./src\assets\rower-elektryczny-gorski-mtb-rockrider-e-st-500-275.jpg"
              alt="Rower Górski"
              className="w-full object-cover"
            />
            <div className="p-2">
              <h3 className="text-xl">Wyposażenie TODO</h3>
              <p className=" mb-2 text-sm md:text-base">
                Idealny rower do jazdy w trudnym terenie, wytrzymały i solidny.
              </p>
              <h4 className="text-lg  mb-1">Dostępne wyposażenie:</h4>
              <ul className="text-sm md:text-base">
                <li>Amortyzatory</li>
                <li>Hamulce tarczowe</li>
                <li>Bidon</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
