Lucky Reels — Testing Guide

1. Purpose

This document describes how to run the project's current automated checks and what still requires manual or additional automated testing.

A successful build does not by itself prove that the game is complete, mathematically correct, secure, or approved for platform submission.

2. Environment

The project uses:

- React 19
- TypeScript
- Vite 6
- Vitest
- GitHub Actions for continuous integration

Use a supported Node.js version compatible with the project's dependencies and lockfile.

3. Run the Existing Checks

Install dependencies using the package manager and lockfile configured in the repository.

Run the test suite:

npm test

Run the production build:

npm run build

Both commands must complete successfully before treating the current revision as passing these checks.

4. Current Test Scope

The existing automated tests cover configuration-level behavior, including symbol definitions, draft math-model consistency, and basic platform configuration.

These checks do not establish that:

- The draft math model drives runtime spins.
- All payout calculations are correct.
- All balance transitions are correct.
- The complete user interface works on every supported device.
- Raise Engine integration exists or is valid.
- The game has passed platform certification.

Confirm the actual test files before relying on any specific coverage claim.

5. Required Game Logic Tests

When the runtime spin engine is implemented, add deterministic tests for:

- A matching triple produces the configured win.
- A non-matching triple produces the configured loss.
- Each supported symbol is handled correctly.
- Bet amounts are validated.
- Bets cannot exceed the available demo balance.
- The balance is deducted exactly once per valid spin.
- Payouts follow the validated paytable.
- Invalid configuration is rejected safely.
- Repeated spins do not reuse stale results.
- Rounding and numeric boundaries behave consistently.

Use fixed outcomes or injected deterministic random values where possible. Avoid tests that depend on unpredictable random results.

6. Interface and Mobile Testing

Manually test the application in mobile browsers and at different viewport sizes.

Check:

- The reels remain visible and aligned.
- Buttons remain usable on narrow screens.
- The balance and bet amount are readable.
- Spin interactions prevent unintended duplicate actions.
- Loading and disabled states are understandable.
- Layout and text remain usable in supported languages.
- Errors do not leave the game in a broken state.
- Keyboard and assistive-technology access is reasonable where applicable.

Record device, browser, viewport, test steps, and observed results for reproducibility.

7. GitHub Actions

After each committed change, inspect the workflow run associated with that commit.

Confirm that the workflow completed and review the actual test and build results. A green status applies only to the checks that the workflow runs; it does not imply that untested features work.

If a run fails:

1. Open the failed workflow run.
2. Identify the failing step.
3. Read the first relevant error and its surrounding context.
4. Correct the underlying cause.
5. Commit the correction and verify the new run.

8. Mathematics Validation

Before relying on the math model:

- Verify symbol weights and probabilities.
- Verify the complete outcome distribution.
- Verify payout conventions and balance calculations.
- Compare deterministic results with independent expected values.
- Use simulations only as supplementary evidence.
- Obtain independent testing or certification if required.

Do not publish an RTP or certification claim without appropriate validation.

9. Platform Integration Testing

The current platform adapter is a standalone demo adapter, not a verified Raise Engine integration.

Before any platform submission, use the platform's current official documentation to determine the required integration tests, configuration, reporting, security controls, and acceptance checks.

Do not treat placeholder behavior as a completed platform integration.

10. Test Status Record

For each release candidate, record:

- Commit SHA.
- Date of the test run.
- Node.js and package-manager versions.
- Automated test result.
- Production build result.
- Manual device/browser checks.
- Known failures and limitations.
- Platform integration and certification status, if applicable.

11. Release Gate

Do not describe a build as production-ready solely because "npm test" and "npm run build" pass.

Release readiness requires the actual runtime game, validated mathematics, appropriate security and compatibility checks, and any platform or legal approvals applicable to the intended deployment.
