import { describe, expect, it } from "vitest";
import { gameManifest } from "../shared/gameManifest";
import * as platformAdapter from "../src/client/game/platformAdapter";

describe("Lucky Reels platform configuration", () => {
  it("identifies the game correctly", () => {
    expect(gameManifest.id).toBe("lucky-reels");
    expect(gameManifest.name).toBe("Lucky Reels");
    expect(gameManifest.mode).toBe("demo");
    expect(gameManifest.realMoneyEnabled).toBe(false);
  });

  it("declares the current web platform only", () => {
    expect(gameManifest.supportedPlatforms).toEqual(["web"]);
    expect(gameManifest.supportedPlatforms).not.toContain("raise-engine");
    expect(gameManifest.supportedPlatforms).not.toContain("stake-engine");
  });

  it("exports the platform adapter module", () => {
    expect(platformAdapter).toBeDefined();
  });
});
