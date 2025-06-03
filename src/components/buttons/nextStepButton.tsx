type Props = {
  onNext: () => void;
  message: string;
  disabled?: boolean;
};

export default function NextStepButton({ onNext, message,disabled }: Props) {
  return (
    <button disabled={disabled}  className="w-full mr-4 text-xl  text-white p-4 bg-background-main rounded" onClick={onNext}>
      {message}
    </button>
  );
}
