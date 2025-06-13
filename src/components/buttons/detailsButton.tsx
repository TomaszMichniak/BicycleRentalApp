type Props = {
  onClick: () => void;
  message: string;

};

export default function DetailsButton({ onClick, message }: Props) {
  return (
    <button className="w-full mr-4 text-xl  text-white p-4 bg-background-main rounded" onClick={onClick}>
      {message}
    </button>
  );
}