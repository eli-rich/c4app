interface CellProps {
  bgColor: string;
  col: number;
  place: (col: number) => void;
  isLastMove?: boolean;
}

export default function Cell(props: CellProps) {
  const getGlowClass = () => {
    if (!props.isLastMove) return '';

    // Determine glow color based on piece color
    if (props.bgColor.includes('blue')) {
      return 'glow-blue-pulse';
    } else if (props.bgColor.includes('pink')) {
      return 'glow-pink-pulse';
    }
    return '';
  };

  return (
    <div class='w-full h-full p-1.5 md:p-1.5 max-md:p-0.5'>
      <div
        onClick={() => props.place(props.col)}
        class={`${props.bgColor} w-full h-full rounded-full cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 shadow-md ${getGlowClass()}`}
      ></div>
    </div>
  );
}
