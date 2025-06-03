import { useIsMobile } from "../../hooks/useIsMobile";
import { Guest } from "../../types/guestType";
import NextStepButton from "../buttons/nextStepButton";
import PreviousStepButton from "../buttons/previousStepButton";
type Props = {
  errors: { [key: string]: boolean };
  data: Guest;
  onChange: (data: Partial<Guest>) => void;
  onNext?: () => void;
  onBack?: () => void;
  validateContact: () => { [key: string]: boolean };
};

export default function ContactStep({
  data,
  onNext,
  onChange,
  onBack,
  validateContact,
  errors,
}: Props) {
  const isMobile = useIsMobile();
  const handleNext = () => {
    const validationErrors = validateContact();
    if (Object.keys(validationErrors).length === 0) {
      onNext?.();
    }
  };
  return (
    <div className="space-y-4  ">
      <div className="bg-background-main p-4">
        <h2 className="text-4xl text-white">Twoje dane</h2>
      </div>
      <div className="px-4 space-y-4">
        {[
          {
            id: "firstName",
            label: "Imię",
            value: data.firstName,
            type: "text",
            key: "firstName",
          },
          {
            id: "lastName",
            label: "Nazwisko",
            value: data.lastName,
            type: "text",
            key: "lastName",
          },
          {
            id: "email",
            label: "Email",
            value: data.email,
            type: "email",
            key: "email",
          },
          {
            id: "phone",
            label: "Numer telefonu",
            value: data.phone,
            type: "tel",
            key: "phone",
          },
        ].map((field) => (
          <div key={field.id} className="relative w-full">
            <input
              id={field.id}
              type={field.type}
              value={field.value}
              onChange={(e) => {
                onChange({ [field.key]: e.target.value });
              }}
              className={`w-full pt-4 px-3 border rounded text-lg focus:outline-none bg-background-gray text-black peer
                ${
                  errors[field.key]
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-500 focus:border-background-main focus:ring-1 focus:ring-background-main"
                }
              `}
            />
            <label
              htmlFor={field.id}
              className={`absolute left-3 top-1 text-xs peer-focus:text-background-main
                ${errors[field.key] ? "text-red-500" : "text-gray-600"}
              `}
            >
              {field.label}
            </label>
          </div>
        ))}
      </div>

      {isMobile && (
        <div className="flex gap-2 pt-4">
          {onBack && <PreviousStepButton onBack={onBack} message="<" />}
          {onNext && (
            <NextStepButton onNext={handleNext} message="Przejdz dalej" />
          )}
        </div>
      )}
    </div>
  );
}
