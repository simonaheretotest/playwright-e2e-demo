# Playwright E2E Demo – Sauce Demo

![Playwright Tests](https://github.com/simonaheretotest/playwright-e2e-demo/actions/workflows/playwright.yml/badge.svg)

End-to-end test framework for [saucedemo.com](https://www.saucedemo.com), built with **Playwright + TypeScript**.

**19 test scenarios × 3 browsers = 57 test runs**, all running automatically in GitHub Actions on every push.

## What is tested

| Area | Tests |
|---|---|
| Login | valid login, locked out user, wrong password, empty username, empty password |
| Cart | add and remove products, cart badge count, cart contents |
| Sorting | price low → high, price high → low, name Z → A |
| Checkout | full order, required-field validation (data-driven), item total = sum of product prices |

Runs on **Chromium, Firefox and mobile (iPhone 14)**.

## Tech and approach

- Playwright Test + TypeScript
- Page Object Model with a Page Manager
- Data-driven tests for form validation
- Random test data with Faker
- Web-first assertions instead of fixed waits
- Environment variables with dotenv, secrets in GitHub Actions
- CI with GitHub Actions and an HTML report artifact

## Project structure

```
page-objects/   page classes (LoginPage, InventoryPage, CheckoutPage, ...)
tests/          test files by feature
.github/        CI workflow
```

## How to run

```bash
npm install
npx playwright install
cp .env.example .env
npm test              # all browsers
npm run test:headed   # watch it in Chromium
npm run report        # open the HTML report
```

## What I learned

- **Flaky test fix:** the item-total test sometimes read prices before the checkout page had loaded. `allTextContents()` doesn't wait, so I added a web-first assertion (`toHaveCount`) before reading the values.
- **Sorting numbers in JavaScript:** `.sort()` sorts numbers as text by default, so I compare against a sorted copy using `(a, b) => a - b`.
- **CI secrets:** environment variables must match the secret names in GitHub exactly.

## Author

Simona – QA tester (ISTQB CTFL), moving from manual testing to automation.
[GitHub](https://github.com/simonaheretotest)
