import type { SlotSymbol } from "./symbols";

export type SymbolWeight = {
  symbolId: SlotSymbol["id"];
  weight: number;
};

export type SymbolPayout = {
  symbolId: SlotSymbol["id"];
  multiplier: number;
};

export type SlotMathModel = {
  modelVersion: string;
  status: "draft" | "validated";
  reelCount: 3;
  symbolsPerReel: 1;
  selectionMode: "weighted-random";
  winCondition: "all-reels-match";
  payoutMode: "bet-multiplier";
  symbolWeights: readonly SymbolWeight[];
  payouts: readonly SymbolPayout[];
  notes: readonly string[];
};

export const slotMathModel: SlotMathModel = {
  modelVersion: "0.1.0",
  status: "draft",
  reelCount: 3,
  symbolsPerReel: 1,
  selectionMode: "weighted-random",
  winCondition: "all-reels-match",
  payoutMode: "bet-multiplier",

  symbolWeights: [
    { symbolId: "eye-of-horus", weight: 1 },
    { symbolId: "golden-scarab", weight: 1 },
    { symbolId: "ankh", weight: 1 },
    { symbolId: "sacred-lotus", weight: 1 },
    { symbolId: "royal-gem", weight: 1 },
    { symbolId: "pharaoh-crown", weight: 1 },
    { symbolId: "sun-disk", weight: 1 },
    { symbolId: "falcon", weight: 1 },
    { symbolId: "royal-cat", weight: 1 },
    { symbolId: "pyramid", weight: 1 },
    { symbolId: "obelisk", weight: 1 },
    { symbolId: "papyrus", weight: 1 },
    { symbolId: "royal-scepter", weight: 1 },
    { symbolId: "golden-coin", weight: 1 },
    { symbolId: "lapis-lazuli", weight: 1 },
    { symbolId: "desert-oasis", weight: 1 },
    { symbolId: "temple", weight: 1 },
    { symbolId: "royal-boat", weight: 1 },
    { symbolId: "canopic-jar", weight: 1 },
    { symbolId: "sphinx", weight: 1 },
  ],

  payouts: [
    { symbolId: "eye-of-horus", multiplier: 10 },
    { symbolId: "golden-scarab", multiplier: 8 },
    { symbolId: "ankh", multiplier: 7 },
    { symbolId: "sacred-lotus", multiplier: 6 },
    { symbolId: "royal-gem", multiplier: 5 },
    { symbolId: "pharaoh-crown", multiplier: 5 },
    { symbolId: "sun-disk", multiplier: 4 },
    { symbolId: "falcon", multiplier: 4 },
    { symbolId: "royal-cat", multiplier: 3 },
    { symbolId: "pyramid", multiplier: 3 },
    { symbolId: "obelisk", multiplier: 3 },
    { symbolId: "papyrus", multiplier: 2 },
    { symbolId: "royal-scepter", multiplier: 2 },
    { symbolId: "golden-coin", multiplier: 2 },
    { symbolId: "lapis-lazuli", multiplier: 2 },
    { symbolId: "desert-oasis", multiplier: 2 },
    { symbolId: "temple", multiplier: 2 },
    { symbolId: "royal-boat", multiplier: 2 },
    { symbolId: "canopic-jar", multiplier: 2 },
    { symbolId: "sphinx", multiplier: 2 },
  ],

  notes: [
    "This is a draft model for demo gameplay.",
    "All three reels must show the same symbol to win.",
    "Each symbol currently has equal selection weight.",
    "Payout multipliers are illustrative and not mathematically certified.",
    "The model must be validated before any real-money platform submission.",
  ],
};
     
