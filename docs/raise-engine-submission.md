Lucky Reels — Raise Engine Submission Preparation

1. Purpose

This document tracks the preparation required to evaluate Lucky Reels for a possible future submission to Raise Engine.

This is a preparation checklist only. It does not confirm platform compatibility, acceptance, certification, or eligibility for real-money operation.

2. Current Project Status

- Project name: Lucky Reels
- Game theme: Ancient Egypt
- Current technology: React 19, TypeScript, and Vite 6
- Current delivery: Standalone web demo
- Current balance: Virtual demo credits
- Current game format: Three reels with one visible symbol per reel
- Current win condition: All three displayed symbols match
- Real-money transactions: Not implemented
- Actual Raise Engine integration: Not implemented
- Platform approval: Not obtained

3. Pre-Submission Checklist

Before attempting a submission, review each item against the current official Raise Engine documentation.

- [ ] Confirm the platform's current developer eligibility and onboarding requirements.
- [ ] Confirm the required project structure and supported technology stack.
- [ ] Confirm the official SDK, APIs, and integration procedure.
- [ ] Confirm required configuration files and game metadata.
- [ ] Confirm asset formats, dimensions, size limits, and loading rules.
- [ ] Confirm required game lifecycle events and platform communication.
- [ ] Confirm authentication and any required session-handling procedures.
- [ ] Confirm the platform's game mathematics and reporting requirements.
- [ ] Confirm the testing, review, and certification process.
- [ ] Confirm applicable jurisdiction, licensing, and compliance requirements.
- [ ] Complete the required integration and automated tests.
- [ ] Test the final build using the platform's approved testing process.

Do not mark a requirement complete until it has been verified against official documentation or confirmed by the platform.

4. Integration Boundary

The existing "src/client/game/platformAdapter.ts" is a standalone demo adapter.

It must not be treated as a working Raise Engine adapter. Any future integration must use the actual supported interfaces and requirements documented by the platform.

Do not invent endpoint URLs, SDK methods, credentials, configuration properties, or platform event names.

Keep demo functionality separate from platform-specific integration so that the standalone demo remains identifiable as a virtual-credit game.

5. Game Mathematics

The current symbol weights and payout multipliers are draft values.

Before any submission requiring validated mathematics:

1. Define the intended paytable and game rules.
2. Calculate theoretical return to player (RTP) from the actual probability distribution and payouts.
3. Calculate hit frequency and other required statistical measures.
4. Validate the implementation against the approved mathematical model.
5. Run reproducible simulations and deterministic unit tests.
6. Obtain any independent testing or certification required by the platform or applicable regulations.

Do not advertise an RTP, certification, or compliance status until it has been calculated, validated, and appropriately approved.

6. Security and Responsible Operation

The current project does not implement real-money deposits, withdrawals, wallets, or payment processing.

Do not add real-money functionality merely by changing the displayed balance or payout multipliers. Any future implementation must follow the platform's official architecture and applicable legal requirements.

Keep credentials and private platform configuration out of source code and public repository files.

7. Submission Evidence

Maintain a record of:

- Official documentation links and the date reviewed.
- Required platform configuration and integration changes.
- Successful build and automated test results.
- Test reports and validated mathematics.
- Required security, legal, and certification evidence.
- Submission status and any feedback received from the platform.

8. Completion Criteria

This preparation document is complete when the checklist has been reviewed and updated with verified evidence.

The project itself is not submission-ready merely because this document exists. Submission readiness depends on the actual implementation, official platform requirements, test results, and any required approvals.
