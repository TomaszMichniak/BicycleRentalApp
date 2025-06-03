type Props = {
  onBack: () => void;
  message: string;
};

export default function PreviousStepButton({ onBack, message }: Props) {
  return (
    <button className="text-xl text-white bg-[#4f4f4f] ml-4 p-4 rounded" onClick={onBack}>
      {message}
    </button>
  );
}
