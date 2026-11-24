Lucky Reels — Architecture

1. Project Overview

Lucky Reels is a three-reel slot game with an ancient Egyptian theme.

The current project is a standalone web demo that uses virtual credits only. It does not process real-money transactions.

2. Technology Stack

- React 19
- TypeScript
- Vite 6
- Vitest for automated tests
- GitHub Actions for continuous integration

3. Main Components

- "src/client/main.tsx" — application entry point.
- "src/client/App.tsx" — current application interface.
- "src/client/styles.css" — global styling.
- "src/client/game/SlotsGame.tsx" — slot game interface and demo interaction.
- "src/client/game/SlotReel.tsx" — reusable reel display.
- "src/client/components/GameShell.tsx" — reusable game wrapper.
- "src/client/game/platformAdapter.ts" — standalone demo platform adapter.
- "shared/gameManifest.ts" — game metadata and declared capabilities.
- "shared/symbols.ts" — symbol definitions.
- "shared/mathModel.ts" — draft math-model definitions.
- "math/slots-math-model.json" — draft math configuration.
- "tests/" — automated configuration tests.
- "docs/" — project documentation.
- "public/assets/" — intended location for public assets.

4. Game Rules

- The game has three reels.
- Each reel displays one symbol.
- A win requires all three symbols to match.
- The current mode uses virtual demo credits.
- Payout multipliers and symbol weights are draft values.
- Real-money transactions, jackpots, wild symbols, scatter symbols, and free spins are not enabled.

5. Architecture Boundaries

The interface, symbol definitions, math configuration, and platform adapter are separate modules.

The draft math model is not yet connected to the runtime game logic. The JSON math configuration is documentation and is not currently loaded by the game.

The platform adapter is a demo adapter. It does not implement an actual Raise Engine or Stake Engine integration.

The existing "App.tsx" must be integrated with the actual game component and tested before the application can be considered fully connected.

6. Testing

The configured commands are:

npm test
npm run build

Current tests check symbol configuration, draft math-model consistency, and basic platform configuration. They do not certify game mathematics or prove that a complete runtime spin engine is correct.

7. Planned Work

1. Review and consolidate the game interface.
2. Integrate the game component and reusable reel component.
3. Connect the reusable game wrapper where appropriate.
4. Implement and test runtime spin and payout logic.
5. Connect runtime logic to the shared math model.
6. Add deterministic tests for matching, non-matching, balance changes, and payouts.
7. Validate accessibility, responsive layout, and mobile browser behavior.
8. Review the target platform's official integration requirements.
9. Validate mathematics and platform compliance before considering any real-money deployment.

8. Security and Compliance

The current demo must not be represented as a real-money gambling product.

Any future real-money deployment requires separate review of platform rules, applicable laws, game mathematics, testing, certification, and required approvals.

No platform integration or approval should be considered complete until verified against the target platform's official documentation.
