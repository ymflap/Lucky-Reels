import { useState } from "react";

type GameStatus = "ready" | "demo";

export default function App() {
  const [status, setStatus] = useState<GameStatus>("ready");

  return (
    <div className="app">
      <header className="app-header">
        <a className="brand" href="/" aria-label="Lucky Reels home">
          <span className="brand-icon" aria-hidden="true">
            ★
          </span>
          <span>LUCKY REELS</span>
        </a>

        <span className="header-label">SLOT GAME</span>
      </header>

      <main className="app-main">
        <section className="welcome" aria-labelledby="game-title">
          <p className="eyebrow">THREE-REEL SLOT EXPERIENCE</p>

          <h1 id="game-title">Lucky Reels</h1>

          <p className="welcome-description">
            A classic slot experience, built for browser-based
            gameplay and future platform integration.
          </p>
        </section>

        <section
          className="game-panel"
          aria-label="Game preview"
        >
          <div className="game-panel-header">
            <span className="game-label">GAME PREVIEW</span>
            <span className="demo-indicator">
              <span className="status-dot" />
              DEMO MODE
            </span>
          </div>

          <div
            className="reels-preview"
            aria-label="Three reel preview"
          >
            <div className="reel-window" aria-hidden="true">
              ★
            </div>

            <div className="reel-window" aria-hidden="true">
              7
            </div>

            <div className="reel-window" aria-hidden="true">
              ★
            </div>
          </div>

          <p className="preview-message" role="status">
            {status === "ready"
              ? "The game interface is being assembled."
              : "This is a visual preview, not a playable game."}
          </p>

          <button
            className="preview-button"
            type="button"
            onClick={() => setStatus("demo")}
          >
            Explore Demo Preview
          </button>

          <p className="demo-disclaimer">
            Prototype only. No real-money wagers, deposits,
            or payouts are available.
          </p>
        </section>

        <footer className="app-footer">
          <span>LUCKY REELS</span>
          <span>Browser Game Prototype</span>
        </footer>
      </main>
    </div>
  );
          }
