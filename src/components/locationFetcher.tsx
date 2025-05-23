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
        onClick(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setError(`Błąd pobierania lokalizacji: ${err.message}`);
      }
    );
  };
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          getLocation();
        }}
      >
        Pobierz lokalizację
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
