import { useIsMobile } from "../../hooks/useIsMobile";

type Props = {
  value: any; //TODO Define FormData type
  paymentMethod: string;
  onChange: (method: any) => void; //Todo: define PaymentMethod type
  onBack?: () => void;
  onSubmit?: () => void;
};
export default function PaymentStep({
  value,
  paymentMethod,
  onSubmit,
  onBack,
  onChange,
}: Props) {
  const isMobile = useIsMobile();
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Wybierz metodę płatności</h2>
      <select
        className="w-full p-2 border rounded"
        value={paymentMethod}
        onChange={(e) => onChange({ paymentMethod: e.target.value })}
      >
        <option value="">Wybierz</option>
        <option value="card">Karta</option>
        <option value="blik">BLIK</option>
        <option value="cash">Gotówka</option>
      </select>
      {isMobile && (
        <div className="flex gap-2">
          {onBack && (
            <button className="btn" onClick={onBack}>
              Wstecz
            </button>
          )}
          {onSubmit && (
            <button className="btn" onClick={onSubmit}>
              Zamów
            </button>
          )}
        </div>
      )}
    </div>
  );
}
