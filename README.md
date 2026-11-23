# Playwright E2E Demo – Sauce Demo

![Playwright Tests](https://github.com/simonaheretotest/playwright-e2e-demo/actions/workflows/playwright.yml/badge.svg)

End-to-end tests for [saucedemo.com](https://www.saucedemo.com) written in **Playwright + TypeScript**.

## What is tested
| Area | Tests |
|---|---|
| Login | valid login, locked user, wrong password, empty fields |
| Cart | add / remove products, cart badge, cart contents |
| Sorting | price low–high, high–low, name Z–A |
| Checkout | full order, form validation, price total |

Runs on **Chromium, Firefox and mobile (iPhone 14)**.

## Tech
- Playwright Test + TypeScript
- Page Object Model + Page Manager
- Environment variables with dotenv
- GitHub Actions CI with HTML report

## Project structure
```
page-objects/   page classes (LoginPage, InventoryPage, ...)
tests/          test files by feature
.github/        CI workflow
```

## How to run
```bash
npm install
npx playwright install
cp .env.example .env
npm test            # all browsers
npm run test:headed # watch it in Chromium
npm run report      # open the HTML report
```

## Report
<!-- Add a screenshot of your HTML report here -->

## Bugs found
<!-- Optional: note anything odd you found (e.g. problem_user, visual_user) -->
