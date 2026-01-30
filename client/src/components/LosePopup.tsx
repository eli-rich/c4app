interface LoseProps {
  close: () => void;
}
export default function Lose(props: LoseProps) {
  return (
    <div class='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div class='bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-8 animate-[scale-in_0.2s_ease-out]'>
        <div class='text-center'>
          <div class='text-6xl mb-4'>😔</div>
          <h3 class='font-bold text-3xl text-gray-100 mb-2'>Better Luck Next Time</h3>
          <p class='text-gray-300 text-lg mb-6'>The AI won this round.</p>
          <button
            class='bg-linear-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 w-full'
            onClick={props.close}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
