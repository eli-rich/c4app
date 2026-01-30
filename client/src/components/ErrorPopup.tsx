interface ErrorProps {
  close: () => void;
}
export default function ErrorPopup(props: ErrorProps) {
  return (
    <div class='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div class='bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-8 animate-[scale-in_0.2s_ease-out]'>
        <div class='text-center'>
          <div class='text-6xl mb-4'>⚠️</div>
          <h3 class='font-bold text-3xl text-gray-100 mb-2'>Invalid Move</h3>
          <p class='text-gray-300 text-lg mb-6'>This column is full. Try another one!</p>
          <button
            class='bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 w-full'
            onClick={props.close}
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
