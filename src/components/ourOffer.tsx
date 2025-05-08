export default function OurOffer() {
  return (
    <section id="ourOffer"  className="bg-background-third py-16">
      <div className="max-w-screen-lg mx-auto p-4 text-white">
        <h2 className="text-2xl mb-4">Nasza Oferta</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-black">
          <div className="bg-background-main w-full shadow-lg rounded-lg overflow-hidden">
            <img
              src="./src\assets\rockrider-e-st100-275.jpg"
              alt="Rower elektryczny"
              className="w-full  object-cover "
            />
            <div className="p-2">
              <h3 className="text-xl  mb-2">
                Rower elektryczny ms-0001
              </h3>
              <p className=" mb-2">
                zmienić to kłamstwo Idealny rower do jazdy po mieście, wygodny i stylowy.
              </p>
              <h4 className="text-lg  mb-2">
                Dostępne rozmiary:
              </h4>
              <ul className="">
                <li>S</li>
                <li>M</li>
                <li>XL</li>
              </ul>
            </div>
          </div>
          <div className="bg-background-main shadow-lg rounded-lg overflow-hidden">
            <img
              src="./src\assets\rockrider-e-st100-275.jpg"
              alt="Rower Górski"
              className="w-full object-cover"
            />
            <div className="p-2">
              <h3 className="text-xl mb-2">
                Wyposażenie
              </h3>
              <p className=" mb-2">
                Idealny rower do jazdy w trudnym terenie, wytrzymały i solidny.
              </p>
              <h4 className="text-lg  mb-2">
                Dostępne wyposażenie:
              </h4>
              <ul className="">
                <li>Amortyzatory</li>
                <li>Hamulce tarczowe</li>
                <li>Bidon</li>
              </ul>
            </div>
          </div>
         
        </div>
      </div>
    </section>
  );
}
