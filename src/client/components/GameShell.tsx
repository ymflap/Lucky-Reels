import type { ReactNode } from "react";

type GameShellProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function GameShell({
  children,
  title = "LUCKY REELS",
  subtitle = "ANCIENT EGYPT • SLOT GAME",
  className = "",
}: GameShellProps) {
  const shellClassName = [
    "lr-shell",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={shellClassName}
      aria-label="Lucky Reels game area"
    >
      <header className="lr-shell-header">
        <div className="lr-shell-emblem" aria-hidden="true">
          <span>☥</span>
        </div>

        <div className="lr-shell-heading">
          <h2 className="lr-shell-title">{title}</h2>
          <p className="lr-shell-subtitle">{subtitle}</p>
        </div>

        <div
          className="lr-shell-emblem"
          aria-hidden="true"
        >
          <span>𓂀</span>
        </div>
      </header>

      <div className="lr-shell-divider" aria-hidden="true">
        <span>◆</span>
        <span>◇</span>
        <span>◆</span>
      </div>

      <div className="lr-shell-content">{children}</div>

      <footer className="lr-shell-footer">
        <span>ANCIENT EGYPT</span>
        <span aria-hidden="true">☥</span>
        <span>DEMO EXPERIENCE</span>
      </footer>
    </section>
  );
                                  }
