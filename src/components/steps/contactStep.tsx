import { useIsMobile } from "../../hooks/useIsMobile";
import { Guest } from "../../types/guestType";
type Props = {
  data: Guest;
  onChange: (data: Partial<Guest>) => void;
  onNext?: () => void;
};

export default function ContactStep({ data, onNext, onChange }: Props) {
  const isMobile = useIsMobile();
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Dane kontaktowe</h2>
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Imię"
        value={data.firstName}
        onChange={(e) => onChange({ firstName: e.target.value })}
      />
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Nazwisko"
        value={data.lastName}
        onChange={(e) => onChange({ lastName: e.target.value })}
      />
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Email"
        value={data.email}
        onChange={(e) => onChange({ email: e.target.value })}
      />
      <input
        className="w-full p-2 border rounded"
        type="tel"
        placeholder="Numer telefonu"
        value={data.phone}
        onChange={(e) => onChange({ phone: e.target.value })}
      />
      {isMobile && <button onClick={onNext}>Przejdź dalej</button>}
    </div>
  );
}
