import { createSignal, For, Match, Switch } from 'solid-js';

import Cell from './components/Cell';
import Lose from './components/LosePopup';
import Win from './components/WinPopup';
import ErrorPopup from './components/ErrorPopup';
import Draw from './components/DrawPopup';
import { colToLetter } from './util';

type Stone = 'P' | 'A' | ' '; // P = Player (always blue), A = AI (always pink)
type MoveChar = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

type Board = Array<Stone>;
type Memory = Array<MoveChar>;

type Popup = 'win' | 'lose' | 'draw' | 'error' | 'none';

type Move = number;

export default function Game() {
  const [board, setBoard] = createSignal<Board>(Array(42).fill(' '));
  const [memory, setMemory] = createSignal<Memory>([]);
  const [buttonDisable, setButtonDisable] = createSignal<boolean>(false);
  const [showNG, setShowNG] = createSignal<boolean>(true);
  const [playerGoesFirst, setPlayerGoesFirst] = createSignal<boolean>(true);
  const [showPopup, setShowPopup] = createSignal<Popup>('none');
  const [isThinking, setIsThinking] = createSignal<boolean>(false);
  const [lastMoveIndex, setLastMoveIndex] = createSignal<number>(-1);

  function newGame() {
    setBoard(b => b.map(_ => ' '));
    setMemory([]);
    setButtonDisable(false);
    setShowNG(false);
    setShowPopup('none');
    setIsThinking(false);
    setLastMoveIndex(-1);
    if (!playerGoesFirst()) {
      // AI goes first
      setBoard(b => {
        const nb = [...b];
        nb[lowestEmpty(3)] = 'A';
        return nb;
      });
      setMemory(m => [...m, 'D']);
    }
  }
  function close() {
    setShowPopup('none');
  }
  function youWin() {
    setShowNG(true);
    setShowPopup('win');
  }
  function youLose() {
    setShowNG(true);
    setShowPopup('lose');
  }
  function lowestEmpty(col: Move): number {
    for (let i = 42; i >= 0; i--) {
      if (board()[i] === ' ' && i % 7 === col) {
        return i;
      }
    }
    return -1;
  }
  function place(col: Move) {
    console.log(`Memory: ${memory()}`);
    console.log(`Column: ${col}`);
    if (showNG()) return;
    if (buttonDisable()) return;
    const potential = lowestEmpty(col);
    if (potential === -1) {
      return setShowPopup('error');
    }
    setLastMoveIndex(-1); // Clear highlight when player moves
    setBoard(b => {
      const nb = [...b];
      nb[potential] = 'P'; // Player is always 'P' (blue)
      return nb;
    });
    setMemory(m => {
      const nm = [...m];
      nm.push(colToLetter(col));
      return nm;
    });
    fetchMove();
  }

  async function fetchMove() {
    setIsThinking(true);
    setButtonDisable(true);
    const response = await fetch('/place', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ history: memory().join('') }),
    });
    const { pwin, cwin, move } = await response.json();
    const aiMoveIndex = lowestEmpty(move);
    setBoard(b => {
      const nb = [...b];
      nb[aiMoveIndex] = 'A'; // AI is always 'A' (pink)
      return nb;
    });
    setLastMoveIndex(aiMoveIndex);
    console.log(move);
    setMemory(m => {
      const nm = [...m];
      nm.push(colToLetter(move % 7));
      return nm;
    });
    setIsThinking(false);
    setButtonDisable(false);
    console.log(pwin, cwin);
    if (pwin) {
      return youWin();
    }
    if (cwin) {
      return youLose();
    }
    if (board().every(s => s !== ' ')) return setShowPopup('draw');
  }

  return (
    <div class='relative'>
      {/* Subtle Thinking Indicator */}
      <div class='flex justify-center mb-4'>
        <Switch>
          <Match when={isThinking()}>
            <div class='bg-linear-to-r from-blue-500/20 to-pink-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-6 py-2 flex items-center gap-3 animate-pulse'>
              <div class='w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin'></div>
              <span class='text-blue-300 font-medium text-sm'>AI is thinking...</span>
            </div>
          </Match>
          <Match when={!isThinking()}>
            <div class='h-10'></div>
          </Match>
        </Switch>
      </div>

      {/* Game Board */}
      <div class='flex justify-center mx-auto'>
        <div class='bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-4 border border-gray-700'>
          <div class='grid grid-rows-6 grid-cols-7 gap-2' id='game-grid'>
            <For each={board()}>
              {(cell, index) => (
                <Cell
                  col={index() % 7}
                  place={place}
                  bgColor={`${cell === 'P' ? 'bg-blue-400' : cell === 'A' ? 'bg-pink-400' : 'bg-gray-700'}`}
                  isLastMove={index() === lastMoveIndex()}
                />
              )}
            </For>
          </div>
        </div>
      </div>

      {/* Controls */}
      <Switch>
        <Match when={showNG() === true}>
          <div class='flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 px-4'>
            <button
              class='bg-linear-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95'
              onClick={newGame}
            >
              New Game
            </button>

            <div class='flex items-center gap-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-md px-6 py-3'>
              <div class='flex flex-col'>
                <span class='text-sm text-gray-300 font-medium'>Who goes first?</span>
                <span class='text-xs text-gray-400'>
                  You: <span class='text-blue-400'>Blue</span> • AI: <span class='text-pink-400'>Pink</span>
                </span>
              </div>
              <button
                onClick={() => setPlayerGoesFirst(!playerGoesFirst())}
                class='flex items-center gap-2 hover:scale-105 transition-transform'
                title='Click to toggle'
              >
                <div class='flex items-center gap-1.5'>
                  <div class='w-8 h-8 rounded-full bg-blue-400 shadow-md'></div>
                  <span class='text-gray-400 text-lg'>{playerGoesFirst() ? '←' : '→'}</span>
                  <div class='w-8 h-8 rounded-full bg-pink-400 shadow-md'></div>
                </div>
              </button>
            </div>
          </div>
        </Match>
      </Switch>
      <Switch>
        <Match when={showPopup() === 'lose'}>
          <Lose close={close} />
        </Match>
        <Match when={showPopup() === 'win'}>
          <Win close={close} />
        </Match>
        <Match when={showPopup() === 'draw'}>
          <Draw close={close} />
        </Match>
        <Match when={showPopup() === 'error'}>
          <ErrorPopup close={close} />
        </Match>
      </Switch>
    </div>
  );
}
