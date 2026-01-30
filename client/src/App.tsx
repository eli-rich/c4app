import Game from './Game';

export default function App() {
  return (
    <main class='min-h-dvh pb-4 overflow-x-hidden'>
      <div class='text-center py-6'>
        <h1 class='text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent'>
          Connect 4
        </h1>
        <p class='text-gray-400 text-sm mt-2'>Challenge the AI</p>
      </div>
      <Game />
    </main>
  );
}
