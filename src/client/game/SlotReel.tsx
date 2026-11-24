type SlotReelSymbol = {
  id: string;
  name: string;
  glyph: string;
  color: string;
};

type SlotReelProps = {
  symbol: SlotReelSymbol;
  reelNumber: number;
  spinning?: boolean;
};

export default function SlotReel({
  symbol,
  reelNumber,
  spinning = false,
}: SlotReelProps) {
  return (
    <div
      className={`lr-reel${spinning ? " lr-spinning" : ""}`}
      data-symbol-id={symbol.id}
      role="img"
      aria-label={`Reel ${reelNumber}: ${symbol.name}`}
    >
      <span
        className="lr-symbol"
        style={{ color: symbol.color }}
        aria-hidden="true"
      >
        {symbol.glyph}
      </span>
    </div>
  );
}
