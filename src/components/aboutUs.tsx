import BicycleIcon from "./icons/bicycleIcon";
import CalendarCheckIcon from "./icons/calendarCheckIcon";
import DeliveryIcon from "./icons/deliveryIcon";
import HelmetIcon from "./icons/helmetIcon";
import LocationIcon from "./icons/locationIcon";
import PhoneIcon from "./icons/phoneIcon";

export default function AboutUs() {
  return (
    <section id="o-nas" className="max-w-screen-lg mx-auto my-8 px-2">
      <h2 className="text-2xl mb-4 text-center">Dlaczego warto nas wybrać?</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="flex  flex-col justify-start items-center">
          <DeliveryIcon className="h-20 w-20 text-background-main" />
          <p className="text-base font-bold">Wygodna dostawa</p>
          <p className="text-sm text-center max-w-xs">
            Nie musisz nigdzie jechać — przywieziemy rower tam, gdzie chcesz na
            terenie Podhala.
          </p>
        </div>
        <div className="flex  flex-col justify-start items-center">
          <CalendarCheckIcon className="h-20 w-20 p-2 text-background-main" />
          <p className="text-base font-bold ">Prosta rezerwacja online</p>
          <p className="text-sm text-center max-w-xs">
            Dzieki naszemu systemowi rezerwacji zarezerwujesz rower w kilka
            minut nawet z jednodniowym wyprzedzeniem.
          </p>
        </div>
        <div className="flex flex-col justify-start items-center">
          <LocationIcon className="w-20 h-20 p-2 text-background-main" />
          <p className="text-base font-bold">Odbiór osobisty</p>
          <p className="text-sm text-center max-w-xs">
            Wolisz odebrać rower osobiście? Zapraszamy do jednego z naszych
            dwóch punktów – Kościelisko ul. Nędzy-Kubińca 255 oraz w Nowem
            Bystrem 113
          </p>
        </div>
        <div className="flex flex-col justify-start items-center">
          <BicycleIcon className="w-20 h-20 text-background-main" />
          <p className="text-base font-bold">Nowoczesne, dobrze wyposażone e-rowery</p>
          <p className="text-sm text-center max-w-xs">
            Nasze rowery są regularnie serwisowane, wyposażone w wydajne
            silniki, pojemne baterie oraz wygodne siodełka.
          </p>
        </div>
        <div className="flex flex-col justify-start items-center">
          <HelmetIcon className="w-20 h-20 p-1 text-background-main" />
          <p className="text-base font-bold">Gratisowe wyposażenie</p>
          <p className="text-sm text-center max-w-xs">
            Do każdego roweru dołączamy niezbędne akcesoria — kask, zamek i
            lampki, abyś mógł jeździć bezpiecznie i komfortowo.
          </p>
        </div>
        <div className="flex flex-col justify-start items-center">
          <PhoneIcon className="w-20 h-20 p-3 text-background-main" />
          <p className="text-base font-bold">Szybka pomoc i kontakt</p>
          <p className="text-sm text-center max-w-xs">
            Masz problem na trasie? Oferujemy wsparcie techniczne i pomoc
            telefoniczną w razie potrzeby.
          </p>
        </div>
      </div>
    </section>
  );
}
