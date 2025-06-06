export default function LoadingLoop() {
  return (
    <div className="fixed inset-0 bg-black/75 flex flex-col justify-center items-center z-50 space-y-4">
      <div className="w-16 h-16 border-4 border-dashed border-background-main border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
