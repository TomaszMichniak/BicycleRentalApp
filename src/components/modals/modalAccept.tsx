type Props = {
  message: string;
  onAccept: () => void;
  onCancel?: () => void;
  acceptLabel?: string;
  cancelLabel?: string;
};
export default function ModalAccept({
  message,
  onAccept,
  onCancel,
  acceptLabel = "Akceptuj",
  cancelLabel = "Anuluj",
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg mx-4 p-6 max-w-sm w-full text-center space-y-4">
        <p className="text-lg font-medium">{message}</p>
        <div className="flex justify-center space-x-4 mt-10">
          {cancelLabel && onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              {cancelLabel}
            </button>
          )}
          <button
            onClick={onAccept}
            className="px-4 py-2 rounded bg-background-main text-white hover:bg-[#73ae3a]"
          >
            {acceptLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
