import { useEffect, useRef, useState } from "react";

type SlotSymbol = {
  id: string;
  name: string;
  glyph: string;
  color: string;
  payout: number;
};

type SpinResult = {
  grid: SlotSymbol[][];
  win: number;
};

const SYMBOLS: SlotSymbol[] = [
  { id: "eye", name: "Eye of Horus", glyph: "𓂀", color: "#f8d46b", payout: 5 },
  { id: "scarab", name: "Golden Scarab", glyph: "𓆣", color: "#76dfb1", payout: 8 },
  { id: "ankh", name: "Ankh", glyph: "☥", color: "#f6c85f", payout: 10 },
  { id: "lotus", name: "Lotus", glyph: "𓆸", color: "#d9a7ff", payout: 12 },
  { id: "gem", name: "Royal Gem", glyph: "◆", color: "#71d9ff", payout: 15 },
  { id: "crown", name: "Pharaoh Crown", glyph: "♛", color: "#ffe5a0", payout: 20 },
];

const INITIAL_GRID: SlotSymbol[][] = [
  [SYMBOLS[1], SYMBOLS[3], SYMBOLS[0]],
  [SYMBOLS[0], SYMBOLS[2], SYMBOLS[4]],
  [SYMBOLS[4], SYMBOLS[1], SYMBOLS[5]],
];

function randomSymbol(): SlotSymbol {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function createRandomGrid(): SlotSymbol[][] {
  return Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => randomSymbol())
  );
}

function evaluateSpin(grid: SlotSymbol[][], bet: number): number {
  const middleLine = grid[1];
  const [first, second, third] = middleLine;

  if (first.id !== second.id || second.id !== third.id) {
    return 0;
  }

  return bet * first.payout;
}

export default function SlotsGame() {
  const [grid, setGrid] = useState<SlotSymbol[][]>(INITIAL_GRID);
  const [credits, setCredits] = useState(1000);
  const [bet, setBet] = useState(10);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState(
    "Place your bet and spin the reels."
  );
  const [lastWin, setLastWin] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spinningRef = useRef(false);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function spin() {
    if (spinningRef.current) return;

    if (credits < bet) {
      setMessage("Not enough demo credits. Lower your bet.");
      return;
    }

    spinningRef.current = true;
    setSpinning(true);
    setCredits((current) => current - bet);
    setLastWin(0);
    setMessage("The ancient reels are spinning...");

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    intervalRef.current = setInterval(() => {
      setGrid(createRandomGrid());
    }, 90);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const finalGrid = createRandomGrid();
      const win = evaluateSpin(finalGrid, bet);

      setGrid(finalGrid);
      setLastWin(win);

      if (win > 0) {
        setCredits((current) => current + win);
        setMessage(`THREE OF A KIND! You won ${win} demo credits.`);
      } else {
        setMessage("No match on the center payline. Try again!");
      }

      setSpinning(false);
      spinningRef.current = false;
      timeoutRef.current = null;
    }, 1400);
  }

  return (
    <section className="lr-game" aria-label="Lucky Reels slot game">
      <style>{`
        .lr-game {
          width: 100%;
          max-width: 620px;
          margin: 0 auto;
          padding: 20px;
          color: #fff4d6;
          border: 1px solid rgba(238, 190, 91, .42);
          border-radius: 22px;
          background:
            radial-gradient(ellipse at 50% 0%, #50356d 0%, transparent 62%),
            linear-gradient(150deg, #251a35, #100e1b 75%);
          box-shadow: 0 20px 60px rgba(0, 0, 0, .3);
          font-family: inherit;
        }
        .lr-heading {
          margin: 0;
          color: #f6d477;
          text-align: center;
          font-size: clamp(25px, 6vw, 36px);
          font-weight: 950;
          letter-spacing: 2px;
        }
        .lr-subtitle {
          margin: 7px 0 20px;
          color: #c5b2dc;
          text-align: center;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
        }
        .lr-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 18px;
        }
        .lr-stat {
          padding: 12px;
          border: 1px solid #594469;
          border-radius: 12px;
          background: rgba(12, 9, 20, .6);
          text-align: center;
        }
        .lr-stat-label {
          display: block;
          color: #b7a5c8;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }
        .lr-stat-value {
          display: block;
          margin-top: 5px;
          color: #ffe19a;
          font-size: 23px;
          font-weight: 900;
          font-variant-numeric: tabular-nums;
        }
        .lr-machine {
          position: relative;
          overflow: hidden;
          padding: 14px 10px;
          border: 3px solid #cba24c;
          border-radius: 17px;
          background: linear-gradient(135deg, #76522b, #d9b568, #654126);
          box-shadow: inset 0 0 0 2px #38223f, 0 9px 25px #09070f;
        }
        .lr-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 7px;
          overflow: hidden;
          border: 2px solid #e4c47c;
          border-radius: 9px;
          background: #110e1b;
        }
        .lr-cell {
          display: grid;
          min-width: 0;
          min-height: clamp(64px, 18vw, 96px);
          place-items: center;
          color: #f8d87c;
          background: linear-gradient(180deg, #24192f, #15101f);
          font-size: clamp(35px, 10vw, 56px);
          text-shadow: 0 0 16px currentColor;
          transition: color .15s ease;
        }
        .lr-cell.lr-payline {
          position: relative;
          background: linear-gradient(180deg, #503c5c, #30213e);
          box-shadow: inset 0 3px #f6d477, inset 0 -3px #f6d477;
        }
        .lr-cell.lr-payline::after {
          position: absolute;
          right: 0;
          bottom: 3px;
          left: 0;
          height: 2px;
          background: rgba(255, 230, 160, .18);
          content: "";
        }
        .lr-spinning .lr-cell {
          animation: lr-flash .14s linear infinite alternate;
        }
        @keyframes lr-flash {
          from { opacity: .65; transform: translateY(-2px); }
          to { opacity: 1; transform: translateY(2px); }
        }
        .lr-payline-label {
          margin: 12px 0 0;
          color: #ffe6a1;
          text-align: center;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }
        .lr-controls {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 18px;
        }
        .lr-bet-label {
          display: block;
          margin-bottom: 8px;
          color: #c5b2dc;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
        }
        .lr-bet-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .lr-bet-button {
          min-width: 38px;
          padding: 8px;
          border: 1px solid #675078;
          border-radius: 8px;
          background: #21172d;
          color: #f5e6ff;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }
        .lr-bet-button[aria-pressed="true"] {
          border-color: #f6d477;
          background: #604627;
          color: #ffe6a1;
        }
        .lr-spin {
          width: 100%;
          min-height: 48px;
          margin-top: 18px;
          border: 1px solid #fff0b4;
          border-radius: 12px;
          background: linear-gradient(180deg, #ffe6a1, #c18a32);
          color: #28172d;
          font-size: 16px;
          font-weight: 950;
          letter-spacing: 2px;
          box-shadow: 0 5px 0 #71471e;
          cursor: pointer;
        }
        .lr-spin:disabled {
          opacity: .6;
          cursor: not-allowed;
        }
        .lr-message {
          min-height: 42px;
          display: grid;
          place-items: center;
          margin: 18px 0 0;
          padding: 10px;
          border: 1px solid #554064;
          border-radius: 10px;
          background: rgba(9, 7, 15, .45);
          color: #ffe6a1;
          text-align: center;
          font-size: 13px;
          line-height: 1.6;
        }
        .lr-note {
          margin: 14px 0 0;
          color: #a99ab8;
          text-align: center;
          font-size: 10px;
          line-height: 1.7;
        }
        @media (max-width: 380px) {
          .lr-game { padding: 12px; }
          .lr-machine { padding: 8px 6px; }
          .lr-grid { gap: 4px; }
          .lr-controls { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lr-spinning .lr-cell { animation: none; }
        }
      `}</style>

      <h2 className="lr-heading">LUCKY REELS</h2>
      <p className="lr-subtitle">ANCIENT EGYPT • SLOT MACHINE</p>

      <div className="lr-stats">
        <div className="lr-stat">
          <span className="lr-stat-label">DEMO CREDITS</span>
          <span className="lr-stat-value">{credits.toLocaleString("en-US")}</span>
        </div>
        <div className="lr-stat">
          <span className="lr-stat-label">LAST WIN</span>
          <span className="lr-stat-value">{lastWin.toLocaleString("en-US")}</span>
        </div>
      </div>

      <div className="lr-machine">
        <div
          className={`lr-grid${spinning ? " lr-spinning" : ""}`}
          aria-label="Three reels with three visible symbols each"
          aria-live="off"
        >
          {grid.map((row, rowIndex) =>
            row.map((symbol, columnIndex) => (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className={`lr-cell${rowIndex === 1 ? " lr-payline" : ""}`}
                style={{ color: symbol.color }}
                title={symbol.name}
                aria-label={`${symbol.name}${rowIndex === 1 ? ", center payline" : ""}`}
              >
                <span aria-hidden="true">{symbol.glyph}</span>
              </div>
            ))
          )}
        </div>
        <p className="lr-payline-label">━━━ CENTER PAYLINE ━━━</p>
      </div>

      <div className="lr-controls">
        <div>
          <span className="lr-bet-label">SELECT BET</span>
          <div className="lr-bet-buttons">
            {[5, 10, 25, 50].map((amount) => (
              <button
                key={amount}
                type="button"
                className="lr-bet-button"
                aria-pressed={bet === amount}
                disabled={spinning}
                onClick={() => setBet(amount)}
              >
                {amount}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="lr-bet-label">WIN RULE</span>
          <div style={{ color: "#ffe6a1", fontSize: 12, lineHeight: 1.7 }}>
            Match all 3 symbols on the center line.
          </div>
        </div>
      </div>

      <button
        type="button"
        className="lr-spin"
        onClick={spin}
        disabled={spinning || credits < bet}
      >
        {spinning ? "SPINNING..." : "SPIN"}
      </button>

      <p className="lr-message" role="status">
        {message}
      </p>

      <p className="lr-note">
        DEMO ONLY · Virtual credits have no monetary value.
        <br />
        Illustrative payouts only; no certified math model or platform integration.
      </p>
    </section>
  );
}

