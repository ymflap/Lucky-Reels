import SlotsGame from "./game/SlotsGame";

export default function App() {
return (
<div className="app">
<header className="app-header">
<a
className="brand"
href="./"
aria-label="Lucky Reels home"
>
<span className="brand-icon" aria-hidden="true">
★
</span>
<span>LUCKY REELS</span>
</a>

    <span className="header-label">SLOT GAME</span>
  </header>

  <main className="app-main">
    <section
      className="welcome"
      aria-labelledby="game-title"
    >
      <p className="eyebrow">
        THREE-REEL SLOT EXPERIENCE
      </p>

      <h1 id="game-title">Lucky Reels</h1>

      <p className="welcome-description">
        An ancient Egyptian themed slot game prototype
        with three reels and virtual demo credits.
      </p>
    </section>

    <SlotsGame />

    <p className="demo-disclaimer">
      Experimental demo only. Virtual credits have no
      monetary value. No real-money wagers, deposits,
      or withdrawals are available.
    </p>

    <footer className="app-footer">
      <span>LUCKY REELS</span>
      <span>Experimental Browser Demo</span>
    </footer>
  </main>
</div>

);
}
