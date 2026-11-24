import { describe, expect, it } from "vitest";
import { slotMathModel } from "../shared/mathModel";

describe("Slot math model validation", () => {
  it("uses a valid draft model version", () => {
    expect(slotMathModel.modelVersion).toMatch(/^\d+\.\d+\.\d+$/);
    expect(slotMathModel.status).toBe("draft");
  });

  it("has exactly three reels with one visible symbol per reel", () => {
    expect(slotMathModel.reelCount).toBe(3);
    expect(slotMathModel.symbolsPerReel).toBe(1);
  });

  it("uses positive finite weights and multipliers", () => {
    for (const item of slotMathModel.symbolWeights) {
      expect(Number.isFinite(item.weight)).toBe(true);
      expect(item.weight).toBeGreaterThan(0);
    }

    for (const item of slotMathModel.payouts) {
      expect(Number.isFinite(item.multiplier)).toBe(true);
      expect(item.multiplier).toBeGreaterThan(0);
    }
  });

  it("uses equal selection weights in the current draft", () => {
    const weights = slotMathModel.symbolWeights.map(
      (item) => item.weight,
    );

    expect(weights.length).toBeGreaterThan(0);
    expect(new Set(weights).size).toBe(1);
  });

  it("does not mark the model as validated without math validation", () => {
    expect(slotMathModel.status).not.toBe("validated");
    expect(
      slotMathModel.notes.some((note) =>
        note.toLowerCase().includes("not mathematically certified"),
      ) ||
        slotMathModel.notes.some((note) =>
          note.toLowerCase().includes("draft"),
        ),
    ).toBe(true);
  });
});
     
