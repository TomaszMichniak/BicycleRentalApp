import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import img1 from "../assets/rower-elektryczny-gorski-mtb-rockrider-e-st-500-275-4.jpg";
import img2 from "../assets/rower-elektryczny-gorski-mtb-rockrider-e-st-500-275-5.jpg";
import img3 from "../assets/924caaa7-2ef2-42e7-ae71-c68198d92330.png";
import img4 from "../assets/d3c5d781-f394-4e46-8d78-1ff3ad795bfc.png";
import img5 from "../assets/f2a85482-8634-4201-80c8-8bc4d548ab62.png";
export default function OurOffer() {
  const imagesLeft = [img1, img2];
  const imagesRight = [img3, img4, img5];

  // stan i kierunek lewego slidera
  const [currentImageLeft, setCurrentImageLeft] = useState(0);
  const [directionLeft, setDirectionLeft] = useState(0);
  // stan i kierunek prawego slidera
  const [currentImageRight, setCurrentImageRight] = useState(0);
  const [directionRight, setDirectionRight] = useState(0);

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const isLeftInView = useInView(leftRef, { once: true, margin: "-150px" });
  const isRightInView = useInView(rightRef, { once: true, margin: "-150px" });

  // funkcje do lewego slidera
  const handlePrevLeft = () => {
    setDirectionLeft(-1);
    setCurrentImageLeft((prev) =>
      prev === 0 ? imagesLeft.length - 1 : prev - 1
    );
  };
  const handleNextLeft = () => {
    setDirectionLeft(1);
    setCurrentImageLeft((prev) =>
      prev === imagesLeft.length - 1 ? 0 : prev + 1
    );
  };

  // funkcje do prawego slidera (analogicznie)
  const handlePrevRight = () => {
    setDirectionRight(-1);
    setCurrentImageRight((prev) =>
      prev === 0 ? imagesRight.length - 1 : prev - 1
    );
  };
  const handleNextRight = () => {
    setDirectionRight(1);
    setCurrentImageRight((prev) =>
      prev === imagesRight.length - 1 ? 0 : prev + 1
    );
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
      imagesLeft.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [isLeftInView]);

  useEffect(() => {
    if (isRightInView) {
      imagesRight.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [isRightInView]);

  return (
    <section id="nasza-oferta" className="bg-background-third py-16">
      <div className="max-w-screen-lg mx-auto p-4 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-black">
          {/* Lewa kolumna */}
          <motion.div
            ref={leftRef}
            className="bg-background-main w-full text-white shadow-lg rounded-lg overflow-hidden"
            variants={leftVariants}
            initial="hidden"
            animate={isLeftInView ? "visible" : "hidden"}
          >
            <div className="relative w-full bg-white overflow-hidden">
              <AnimatePresence custom={directionLeft} mode="popLayout">
                <motion.img
                  key={currentImageLeft}
                  src={imagesLeft[currentImageLeft]}
                  alt="Rower elektryczny"
                  className="w-full object-cover"
                  custom={directionLeft}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  loading="eager"
                />
              </AnimatePresence>
              <button
                onClick={handlePrevLeft}
                className="absolute top-0 left-0 h-full text-4xl font-bold text-white p-2"
              >
                {"<"}
              </button>
              <button
                onClick={handleNextLeft}
                className="absolute top-0 right-0 h-full text-4xl font-bold text-white p-2"
              >
                {">"}
              </button>
            </div>
            <div className="p-2">
              <h3 className="text-xl ">MTB Rockrider E-ST 500</h3>
              <p className="mb-2 text-sm md:text-base">
                Elektryczny rower górski, który łączy moc wspomagania z
                niezawodną konstrukcją MTB. Zaprojektowany z myślą o
                eksplorowaniu szlaków, leśnych tras i pagórkowatych terenów, ten
                rower pozwoli Ci cieszyć się jazdą dłużej, szybciej i z większą
                przyjemnością. Dzięki 3 trybom wspomagania i zasięgowi do 100 km
                możesz pokonywać większe dystanse z lekkością i pewnością.
              </p>
              <h4 className="text-lg mb-1">Dostępne rozmiary:</h4>
              <ul className="text-sm md:text-base">
                <li>S (150-164 cm)</li>
                <li>M (165-174 cm)</li>
                <li>L (175-184 cm)</li>
                <li>XL (185-200 cm)</li>
              </ul>
            </div>
          </motion.div>

          {/* Prawa kolumna z animowanym sliderem */}
          <motion.div
            ref={rightRef}
            className="bg-background-main w-full text-white shadow-lg rounded-lg overflow-hidden"
            variants={rightVariants}
            initial="hidden"
            animate={isRightInView ? "visible" : "hidden"}
          >
            <div className="relative w-full bg-white overflow-hidden">
              <AnimatePresence custom={directionRight} mode="popLayout">
                <motion.img
                  key={currentImageRight}
                  src={imagesRight[currentImageRight]}
                  alt="Rower elektryczny - prawa strona"
                  className="w-full object-cover"
                  custom={directionRight}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  loading="eager"
                />
              </AnimatePresence>
              <button
                onClick={handlePrevRight}
                className="absolute top-0 left-0 h-full text-4xl font-bold text-white p-2"
              >
                {"<"}
              </button>
              <button
                onClick={handleNextRight}
                className="absolute top-0 right-0 h-full text-4xl font-bold text-white p-2"
              >
                {">"}
              </button>
            </div>
            <div className="p-2">
              <h3 className="text-xl ">Wyposażenie</h3>
              <p className="mb-2 text-sm md:text-base">
                Gratisowe wyposażenie przy wynajmie roweru obejmuje kask
                rowerowy zapewniający bezpieczeństwo i komfort podczas jazdy,
                fotelik rowerowy dla dziecka z wygodnym siedziskiem i pasami
                bezpieczeństwa oraz wielofunkcyjny wózek dla dziecka z
                amortyzacją i osłoną przeciwsłoneczną, który można łatwo
                przymocować do roweru lub używać osobno, a także solidny łańcuch
                zabezpieczający chroniący rower przed kradzieżą.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
