import { useState } from "react";
import { FormDataValues } from "../../types/formDataValues";
type Props = {
  onChange: (data: Partial<FormDataValues>) => void;
};

export default function DeliveryHours({ onChange }: Props) {
  const deliveryTimeSlots = Array.from({ length: 6 }, (_, i) => {
    const startHour = i + 8;
    const endHour = startHour + 1;

    const format = (h: number) => `${h.toString().padStart(2, "0")}:00`;

    const label = `${format(startHour)} - ${format(endHour)}`;

    return {
      label,
      value: label,
    };
  });
  const [selectedSlot, setSelectedSlot] = useState<string>(
    deliveryTimeSlots[0].value
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setSelectedSlot(e.target.value);
      onChange({ deliveryHours: e.target.value });
    }
  };

  return (
    <div className=" mt-2">
      <label
        htmlFor="deliverySlot"
        className="block text-sm text-gray-600 mb-1"
      >
        Wybierz godzinę
      </label>
      <select
        id="deliverySlot"
        value={selectedSlot}
        onChange={(e) => handleChange(e)}
        className="w-full border border-gray-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-background-main focus:border-background-main"
      >
        {deliveryTimeSlots.map((slot) => (
          <option key={slot.value} value={slot.value}>
            {slot.label}
          </option>
        ))}
      </select>
    </div>
  );
}
