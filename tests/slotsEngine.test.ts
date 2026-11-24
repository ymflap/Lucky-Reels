import { describe, expect, it } from "vitest";
import { slotSymbols } from "../shared/symbols";
import { slotMathModel } from "../shared/mathModel";

describe("Lucky Reels symbol configuration", () => {
  const symbolIds = slotSymbols.map((symbol) => symbol.id);

  it("contains 20 distinct symbols", () => {
    expect(slotSymbols).toHaveLength(20);
    expect(new Set(symbolIds).size).toBe(20);
  });

  it("gives every symbol a name, glyph, and color", () => {
    for (const symbol of slotSymbols) {
      expect(symbol.name.trim()).not.toBe("");
      expect(symbol.glyph.trim()).not.toBe("");
      expect(symbol.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });
});

describe("Lucky Reels math model", () => {
  const symbolIds = slotSymbols.map((symbol) => symbol.id);

  it("uses the three-reel matching win condition", () => {
    expect(slotMathModel.reelCount).toBe(3);
    expect(slotMathModel.symbolsPerReel).toBe(1);
    expect(slotMathModel.winCondition).toBe("all-reels-match");
  });

  it("defines one positive weight for every symbol", () => {
    const weights = slotMathModel.symbolWeights;
    const weightIds = weights.map((item) => item.symbolId);

    expect(new Set(weightIds).size).toBe(weightIds.length);
    expect([...weightIds].sort()).toEqual([...symbolIds].sort());

    for (const item of weights) {
      expect(Number.isFinite(item.weight)).toBe(true);
      expect(item.weight).toBeGreaterThan(0);
    }
  });

  it("defines one positive payout multiplier for every symbol", () => {
    const payouts = slotMathModel.payouts;
    const payoutIds = payouts.map((item) => item.symbolId);

    expect(new Set(payoutIds).size).toBe(payoutIds.length);
    expect([...payoutIds].sort()).toEqual([...symbolIds].sort());

    for (const item of payouts) {
      expect(Number.isFinite(item.multiplier)).toBe(true);
      expect(item.multiplier).toBeGreaterThan(0);
    }
  });

  it("keeps the model marked as a draft", () => {
    expect(slotMathModel.status).toBe("draft");
    expect(slotMathModel.selectionMode).toBe("weighted-random");
    expect(slotMathModel.payoutMode).toBe("bet-multiplier");
  });
});
    
