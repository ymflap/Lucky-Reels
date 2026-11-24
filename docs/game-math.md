Lucky Reels — Game Mathematics

1. Purpose

This document describes the draft mathematical model for Lucky Reels.

The current values are illustrative and must not be treated as certified game mathematics. The model must be connected to the runtime game logic and validated before it can be relied upon.

2. Current Game Structure

- Number of reels: 3
- Visible symbols per reel: 1
- Winning condition: All three symbols match
- Current balance: Virtual demo credits
- Current operation: Standalone demo
- Real-money wagering: Not implemented

3. Symbols and Probabilities

The project defines a set of symbols and draft symbol weights.

A symbol's weight is used to determine its relative selection probability only if the runtime implementation actually uses weighted selection.

For a weighted selection model:

"P(symbol i) = weight(i) / sum(all symbol weights)"

This formula assumes the weights are non-negative, the total weight is greater than zero, and the selection process uses those weights as intended.

The actual runtime selection implementation must be inspected before assuming this formula describes the current game.

4. Three-Reel Outcome Probabilities

If all three reels select symbols independently using the same probability distribution, the probability of a particular matching triple for symbol "i" is:

"P(i, i, i) = P(i)^3"

Under those assumptions, the probability of any three-of-a-kind result is:

"P(three matching symbols) = sum(P(i)^3)"

This result is valid only when the reels are independent and share the same symbol probabilities. If reels use different distributions or correlated selections, the calculation must be adjusted.

5. Payout Model

A payout model must explicitly define:

- The bet deducted for each spin.
- Whether a matching result returns the original stake in addition to its prize.
- The payout multiplier for each winning combination.
- The treatment of non-winning outcomes.
- The order in which the balance is updated.
- The handling of invalid bets and insufficient balances.

The exact interpretation of each multiplier must be consistent throughout the code and documentation.

For a model in which a winning outcome returns "bet × multiplier" as the total credited amount, the net result for that spin is:

"net result = credited amount - bet"

Do not use this equation with a multiplier that represents profit only; that convention requires a different calculation.

6. Theoretical Return to Player

For a fully specified model with outcomes "j", probability "p(j)", and total credited amount "r(j)" per unit bet, the theoretical return to player is:

"RTP = sum(p(j) × r(j))"

Express the result as a percentage by multiplying by 100.

This calculation requires a complete and accurate outcome distribution and a precisely defined payout convention. The current draft values are not sufficient evidence of a verified RTP.

7. Expected Value

For a unit bet, if "r(j)" is the total credited return for outcome "j", the expected net result is:

"EV = sum(p(j) × (r(j) - 1))"

When all outcomes are covered and the model uses the same assumptions as the RTP calculation:

"EV = RTP - 1"

Here, RTP is expressed as a ratio rather than a percentage.

8. Required Validation

Before treating the mathematical model as authoritative:

1. Confirm the complete symbol set and all weights.
2. Confirm the actual reel-selection algorithm.
3. Confirm independence assumptions or model any dependencies.
4. Define every winning and losing outcome.
5. Specify payout multiplier semantics.
6. Calculate outcome probabilities and theoretical RTP.
7. Independently verify calculations with automated tests.
8. Compare runtime outcomes with the mathematical model.
9. Run reproducible simulations as a supplementary check.
10. Obtain any platform-required independent testing or certification.

Simulation results alone do not prove mathematical correctness or certification.

9. Runtime Consistency

The current draft math model and "math/slots-math-model.json" must not be assumed to control the game at runtime unless the application explicitly loads and uses them.

The runtime game logic must eventually consume a single validated model or otherwise demonstrate that its implemented rules exactly match the approved specification.

Add deterministic tests for:

- Matching triples.
- Non-matching triples.
- Each configured symbol.
- Bet validation.
- Balance deduction.
- Payout calculation.
- Insufficient balance.
- Invalid or missing configuration.
- Boundary values and rounding behavior.

10. Compliance Note

This document does not certify the game, establish regulatory compliance, or authorize real-money operation.

Any future deployment must satisfy the target platform's official requirements and all applicable legal, testing, and certification obligations.
