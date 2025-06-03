import { useState } from "react";
export type Props = {
  onClick: (lat: number, lon: number) => void;
};

export default function LocationFetcher({ onClick }: Props) {
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation nie jest wspierane przez Twoją przeglądarkę.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setError(null);
        console.log("onclick:");
        onClick(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setError(`Nie udało się pobrać lokalizacji. Wprowadź adres ręcznie.`);
      }
    );
  };
  return (
    <div>
      <button
        type="button"
        onClick={getLocation}
        className="flex items-center space-x-1 rounded-xl p-1 bg-background-main"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          fill="currentColor"
          className="w-6 h-6 text-white"
        >
          <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
        </svg>
        <span className="whitespace-pre-line text-white text-xs">Pobierz{"\n"}lokalizacje</span>
      </button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
