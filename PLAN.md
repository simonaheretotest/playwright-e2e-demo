# Plan – your own Playwright project

## Week 1 – setup + login
1. Create a new public GitHub repo `playwright-e2e-demo` and clone it.
2. Copy these files in, then run:
   npm install
   npx playwright install
   cp .env.example .env
3. Run `npm run test:headed` – the 3 example tests should pass.
4. Finish the TODO login tests (wrong password, empty username, empty password).
5. Commit + push.

## Week 2 – inventory, cart, sorting
1. Finish the TODO methods in InventoryPage (removeFromCart, sortBy, getAllPrices, openCart).
2. Create CartPage.ts and add it to PageManager.
3. Write the cart and sorting tests.
4. Commit + push after each feature (small commits look good on GitHub).

## Week 3 – checkout + CI + polish
1. Create CheckoutPage.ts (info form, overview, complete).
2. Write the checkout tests, use faker for names and postcode.
3. GitHub → repo → Settings → Secrets and variables → Actions → add
   STANDARD_USER, LOCKED_USER, PASSWORD.
4. Push – check the Actions tab is green.
5. Fill in the README: add a screenshot of the report, check the badge works.
6. Pin the repo on your GitHub profile. Add it to your CV, LinkedIn and Upwork.

## Bonus ideas (pick 1–2)
- Test `problem_user` and `visual_user` and write down the bugs you find in the README.
- Save the login state once (storageState) so tests don't log in every time.
- Add a few API tests with `request` on https://reqres.in or https://restful-booker.herokuapp.com.
- Add a simple accessibility check with @axe-core/playwright.

## Rules for yourself
- No `waitForTimeout` – use `expect(...)` instead.
- One test = one thing to check.
- Use getByTestId / getByRole, not long CSS paths.
