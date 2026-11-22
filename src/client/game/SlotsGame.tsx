import { useEffect, useRef, useState } from "react";

type SlotSymbol = {
  id: string;
  name: string;
  glyph: string;
  color: string;
  payout: number;
};

const SYMBOLS: SlotSymbol[] = [
  { id: "eye", name: "Eye of Horus", glyph: "𓂀", color: "#f8d46b", payout: 5 },
  { id: "scarab", name: "Golden Scarab", glyph: "𓆣", color: "#76dfb1", payout: 8 },
  { id: "ankh", name: "Ankh", glyph: "☥", color: "#f6c85f", payout: 10 },
  { id: "lotus", name: "Sacred Lotus", glyph: "𓆸", color: "#d9a7ff", payout: 12 },
  { id: "gem", name: "Royal Gem", glyph: "◆", color: "#71d9ff", payout: 15 },
  { id: "crown", name: "Pharaoh Crown", glyph: "♛", color: "#ffe5a0", payout: 20 },
];

const INITIAL_SYMBOLS = [SYMBOLS[0], SYMBOLS[2], SYMBOLS[4]];

function randomSymbol(): SlotSymbol {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function evaluateWin(
  symbols: SlotSymbol[],
  bet: number
): number {
  if (
    symbols.length !== 3 ||
    symbols[0].id !== symbols[1].id ||
    symbols[1].id !== symbols[2].id
  ) {
    return 0;
  }

  return bet * symbols[0].payout;
}

export default function SlotsGame() {
  const [symbols, setSymbols] =
    useState<SlotSymbol[]>(INITIAL_SYMBOLS);
  const [credits, setCredits] = useState(1000);
  const [bet, setBet] = useState(10);
  const [spinning, setSpinning] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [message, setMessage] = useState(
    "Place your bet and spin the reels."
  );

  const spinningRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
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

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    intervalRef.current = setInterval(() => {
      setSymbols([randomSymbol(), randomSymbol(), randomSymbol()]);
    }, 100);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const result = [
        randomSymbol(),
        randomSymbol(),
        randomSymbol(),
      ];

      const win = evaluateWin(result, bet);

      setSymbols(result);
      setLastWin(win);

      if (win > 0) {
        setCredits((current) => current + win);
        setMessage(
          `THREE OF A KIND! You won ${win} demo credits.`
        );
      } else {
        setMessage("No match. Your demo bet was lost.");
      }

      setSpinning(false);
      spinningRef.current = false;
      timeoutRef.current = null;
    }, 1600);
  }

  return (
    <section className="lr-game" aria-label="Lucky Reels slot game">
      <style>{`
        .lr-game {
          box-sizing: border-box;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          color: #fff4d6;
          border: 1px solid rgba(238, 190, 91, .45);
          border-radius: 22px;
          background:
            radial-gradient(ellipse at 50% 0%, #50356d, transparent 65%),
            linear-gradient(150deg, #251a35, #100e1b 80%);
          box-shadow: 0 20px 60px rgba(0, 0, 0, .3);
          font-family: inherit;
        }

        .lr-game *,
        .lr-game *::before,
        .lr-game *::after {
          box-sizing: border-box;
        }

        .lr-heading {
          margin: 0;
          color: #f6d477;
          text-align: center;
          font-size: clamp(25px, 7vw, 36px);
          font-weight: 950;
          letter-spacing: 2px;
        }

        .lr-subtitle {
          margin: 7px 0 22px;
          color: #c5b2dc;
          text-align: center;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .lr-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 18px;
        }

        .lr-stat {
          padding: 12px 8px;
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
          letter-spacing: 1px;
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
          padding: 12px;
          border: 3px solid #cba24c;
          border-radius: 17px;
          background: linear-gradient(135deg, #76522b, #d9b568, #654126);
          box-shadow: inset 0 0 0 2px #38223f, 0 9px 25px #09070f;
        }

        .lr-reels {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 7px;
          padding: 8px;
          border: 2px solid #e4c47c;
          border-radius: 10px;
          background: #110e1b;
        }

        .lr-reel {
          display: grid;
          min-width: 0;
          min-height: clamp(100px, 29vw, 155px);
          place-items: center;
          overflow: hidden;
          border: 1px solid #594469;
          border-radius: 7px;
          background: linear-gradient(180deg, #30213e, #15101f 50%, #30213e);
          box-shadow: inset 0 0 14px rgba(0, 0, 0, .45);
        }

        .lr-symbol {
          display: block;
          font-size: clamp(38px, 12vw, 66px);
          line-height: 1.2;
          text-align: center;
          text-shadow: 0 0 18px currentColor;
          user-select: none;
        }

        .lr-spinning .lr-symbol {
          animation: lr-reel-motion .12s linear infinite alternate;
        }

        @keyframes lr-reel-motion {
          from { transform: translateY(-7px); opacity: .7; }
          to { transform: translateY(7px); opacity: 1; }
        }

        .lr-payline {
          margin: 12px 0 0;
          color: #ffe6a1;
          text-align: center;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .lr-controls {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: 20px;
        }

        .lr-bet-label {
          display: block;
          margin-bottom: 9px;
          color: #c5b2dc;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .lr-bet-buttons {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
        }

        .lr-bet-button {
          min-width: 0;
          padding: 10px 5px;
          border: 1px solid #675078;
          border-radius: 8px;
          background: #21172d;
          color: #f5e6ff;
          font-size: 13px;
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
          min-height: 50px;
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
          display: grid;
          min-height: 48px;
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

        @media (max-width: 350px) {
          .lr-game { padding: 12px; }
          .lr-machine { padding: 7px; }
          .lr-reels { gap: 4px; padding: 5px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lr-spinning .lr-symbol { animation: none; }
        }
      `}</style>

      <h2 className="lr-heading">LUCKY REELS</h2>
      <p className="lr-subtitle">ANCIENT EGYPT • SLOT MACHINE</p>

      <div className="lr-stats">
        <div className="lr-stat">
          <span className="lr-stat-label">DEMO CREDITS</span>
          <span className="lr-stat-value">
            {credits.toLocaleString("en-US")}
          </span>
        </div>

        <div className="lr-stat">
          <span className="lr-stat-label">LAST WIN</span>
          <span className="lr-stat-value">
            {lastWin.toLocaleString("en-US")}
          </span>
        </div>
      </div>

      <div className="lr-machine">
        <div
          className={`lr-reels${spinning ? " lr-spinning" : ""}`}
          aria-label="Three slot reels with one symbol per reel"
        >
          {symbols.map((symbol, index) => (
            <div
              className="lr-reel"
              key={index}
              aria-label={`Reel ${index + 1}: ${symbol.name}`}
            >
              <span
                className="lr-symbol"
                style={{ color: symbol.color }}
                aria-hidden="true"
              >
                {symbol.glyph}
              </span>
            </div>
          ))}
        </div>

        <p className="lr-payline">━━━ SINGLE PAYLINE ━━━</p>
      </div>

      <div className="lr-controls">
        <div>
          <span className="lr-bet-label">SELECT DEMO BET</span>

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
        Illustrative payouts only. No real-money wagering or payouts.
      </p>
    </section>
  );
  }
          
