export type GameManifest = {
  id: string;
  name: string;
  version: string;
  description: string;
  genre: "slot";
  theme: "ancient-egypt";
  reels: number;
  symbolsPerReel: number;
  winCondition: "all-reels-match";
  mode: "demo";
  realMoneyEnabled: false;
  supportedPlatforms: readonly ("web" | "raise-engine" | "stake-engine")[];
};

export const gameManifest: GameManifest = {
  id: "lucky-reels",
  name: "Lucky Reels",
  version: "0.1.0",
  description:
    "A three-reel slot game with an ancient Egyptian theme.",
  genre: "slot",
  theme: "ancient-egypt",
  reels: 3,
  symbolsPerReel: 1,
  winCondition: "all-reels-match",
  mode: "demo",
  realMoneyEnabled: false,
  supportedPlatforms: ["web"],
};
