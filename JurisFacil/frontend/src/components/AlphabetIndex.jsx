export default function AlphabetIndex({ terms }) {
    const available = new Set(terms.map((t) => t.letter));
  
    return (
      <aside
        aria-label="Índice alfabético"
        className="fixed right-2 top-1/2 z-30 hidden -translate-y-1/2 border border-[#D4D1CC] bg-[#F9F8F6]/95 py-2 xl:block"
      >
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) =>
          available.has(letter) ? (
            <a
              key={letter}
              href={`#letra-${letter}`}
              className="grid h-7 w-8 place-items-center text-[10px] font-semibold text-[#8C7356] hover:bg-[#1A1C1E] hover:text-white"
            >
              {letter}
            </a>
          ) : (
            <span
              key={letter}
              className="grid h-7 w-8 place-items-center text-[10px] text-[#C4C0BA]"
            >
              {letter}
            </span>
          )
        )}
      </aside>
    );
  }