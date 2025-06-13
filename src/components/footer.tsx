import EmailIcon from "./icons/emailIcon";
import LocationIcon from "./icons/locationIcon";
import PhoneIcon from "./icons/phoneIcon";

export default function Footer() {
  return (
    <footer
      className="bg-background-main pt-10 pb-5 flex flex-col items-center text-white"
    >
      <div className="flex flex-col my-10 md:flex-row justify-center gap-14  ">
        <div className="flex flex-col items-center">
          <PhoneIcon className="text-white w-10 h-10 mb-2" />
          <h3 className="font-medium text-lg">Telefon</h3>
          <a href="tel:+48515 551 325" className="text-base">
            +48 515 551 325
          </a>
        </div>
        <div className="flex flex-col items-center">
          <EmailIcon className="text-white w-10 h-10 mb-2" />
          <h3 className="font-medium text-lg">E-mail</h3>
          <p className="text-sm md:text-base">To_edit@email.pl</p>
        </div>
        <div className="flex flex-col items-center">
          <LocationIcon className="text-white w-10 h-10 mb-2" />
          <h3 className="font-medium text-lg ">Adres</h3>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base text-center"
            href="https://www.google.com/maps/place/Mobilna+wypo%C5%BCyczalnia+rower%C3%B3w+elektrycznych+PMeMountainBikes/@49.332502,19.9246519,17z/data=!3m1!4b1!4m6!3m5!1s0x4715ed14bb4c0013:0x665ab36297aca40!8m2!3d49.332502!4d19.9246519!16s%2Fg%2F11kqmrvngj?hl=pl&entry=ttu&g_ep=EgoyMDI1MDYwOS4xIKXMDSoASAFQAw%3D%3D"
          >
            Nowe Bystre 113
            <br />
            34-521
          </a>
        </div>
      </div>

      <div className=" flex flex-row justify-center text-center text-sm md:text-base gap-2 px-2">
        <a>Regulamin</a>{"-"}
        <a>Polityka prywatności</a>
      </div>
        <p className=" text-center">
          &copy; PM eMountainBikes 2025
        </p>
    </footer>
  );
}
