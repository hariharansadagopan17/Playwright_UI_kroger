# Manhattan UI Inbound Test Automation

A comprehensive test automation project for Manhattan UI testing using Playwright, Cucumber/BDD, and TypeScript.

## Project Overview

This project automates testing of the Manhattan application's Warehouse Management module, specifically:
- **Scenario:** Navigate to Warehouse Management → Inbound → Purchase Orders
- **Framework:** Playwright with Cucumber BDD
- **Language:** TypeScript
- **Reporting:** Cucumber HTML and JSON Reports

## Features

✅ BDD (Behavior Driven Development) approach with Cucumber  
✅ Page Object Model (POM) pattern for maintainability  
✅ TypeScript for type safety  
✅ Multiple reporting formats (HTML, JSON)  
✅ Screenshots and videos on failure  
✅ Cross-browser testing (Chromium, Firefox, WebKit)  
✅ Playwright Codegen utility for test recording  

## Project Structure

```
manhattan-ui-inbound/
├── features/
│   ├── warehouse-inbound-purchase-orders.feature  # BDD Feature file
│   └── step_definitions/
│       └── warehouse-steps.ts                     # Step implementations
├── src/
│   ├── pages/
│   │   ├── login-page.ts                         # Login Page Object
│   │   └── warehouse-page.ts                     # Warehouse Page Object
│   └── config.ts                                  # Test configuration
├── package.json                                   # Dependencies
├── playwright.config.ts                          # Playwright config
├── cucumber.js                                    # Cucumber config
├── tsconfig.json                                  # TypeScript config
├── .gitignore                                     # Git ignore rules
└── README.md                                      # This file
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Chrome, Firefox, or Safari (for the respective browsers)

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Install Playwright browsers (if not already installed):**
```bash
npx playwright install
```

## Configuration

### Application Credentials

The credentials are stored in `src/config.ts`:
```typescript
export const testConfig = {
  baseURL: 'https://krogs-auth.sce.manh.com/',
  credentials: {
    username: 'hardik.sharma@kroger.com',
    password: 'Element92u17$'
  }
};
```

⚠️ **Security Note:** In production, store credentials in environment variables or a secure vault.

## Running Tests

### Run Cucumber BDD Tests

```bash
npm run test:bdd
```

This will execute all feature files and generate Cucumber reports.

### Run Playwright Tests

```bash
npm run test
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

### Run Tests in UI Mode (Interactive)

```bash
npm run test:ui
```

Great for debugging and seeing test execution live!

## Using Playwright Codegen Utility

Playwright Codegen is a powerful utility that records your interactions and generates test code automatically.

### Start Codegen

```bash
npm run test:codegen
```

This will:
1. Launch the application in a browser
2. Open the Playwright Inspector tool
3. Start recording your actions

### How to Use Codegen

1. When the browser opens, you'll see the application URL loaded
2. Perform the following manual steps in the browser:
   - Enter username: `hardik.sharma@kroger.com`
   - Enter password: `Element92u17$`
   - Click Login button
   - Wait for dashboard to load
   - Click on Warehouse Management menu
   - Click on Inbound submenu
   - Click on Purchase Orders
3. As you interact, the Inspector on the right records your actions
4. The generated code appears in the Inspector panel
5. Copy the generated code and paste it into your step definitions if needed
6. Close the browser when done

### Recording Tips

- Click on elements to interact with them
- The Playwright Inspector shows the exact selector used
- Generated code includes `expect` statements for assertions
- You can edit and customize the generated code
- Press `Ctrl+C` to stop the codegen

## Test Reports

After running tests, reports are generated:

### HTML Report
```bash
npx playwright show-report
```

Opens an interactive HTML report showing:
- Test results and status
- Screenshots and videos
- Test duration and traces

### Cucumber Reports

- **HTML Report:** `cucumber-report.html` (open in browser)
- **JSON Report:** `cucumber-report.json` (machine-readable)

## BDD Feature File

The test scenario is described in `features/warehouse-inbound-purchase-orders.feature`:

```gherkin
Feature: Warehouse Management - Inbound Purchase Orders
  Scenario: Navigate to Purchase Orders page and verify it loads successfully
    Given I navigate to the Manhattan application
    When I login with valid credentials
    Then I should see the dashboard
    When I navigate to Warehouse Management
    And I click on Inbound
    And I click on Purchase Orders
    Then I should see the Purchase Orders page loaded
    And I should see the Purchase Orders data table
```

## Page Objects

### LoginPage (`src/pages/login-page.ts`)

Methods:
- `navigateToApp(url)` - Navigate to application
- `enterUsername(username)` - Enter username
- `enterPassword(password)` - Enter password
- `clickLoginButton()` - Click login button
- `login(url, username, password)` - Complete login flow
- `isDashboardLoaded()` - Verify dashboard is loaded

### WarehousePage (`src/pages/warehouse-page.ts`)

Methods:
- `navigateToWarehouseManagement()` - Click Warehouse Management menu
- `clickInbound()` - Click Inbound submenu
- `clickPurchaseOrders()` - Click Purchase Orders
- `navigateToPurchaseOrders()` - Complete navigation flow
- `isPurchaseOrdersPageLoaded()` - Verify page loaded
- `isPurchaseOrdersTableVisible()` - Verify data table visible

## Debugging Failed Tests

1. **Check screenshots:** Located in `test-results/` folder
2. **Check videos:** Located in `test-results/` folder (on failure)
3. **Check traces:** Can be opened in Playwright Inspector
4. **Run in debug mode:** 
   ```bash
   npm run test:debug
   ```
   This opens Playwright Inspector where you can step through code

## Modifying Selectors

If the UI changes and selectors need updating:

1. Open `src/pages/login-page.ts` or `src/pages/warehouse-page.ts`
2. Use Playwright Inspector to find new selectors
3. Update the selectors in the page object
4. Alternative: Use `npm run test:codegen` to record new interactions

## Troubleshooting

### Tests fail with timeout errors
- Increase timeout in `playwright.config.ts`
- Verify internet connection
- Check if URL is accessible

### Selectors not found
1. Use Playwright Inspector to find correct selectors:
   ```bash
   npx playwright inspector
   ```
2. Update `src/pages/*.ts` files with correct selectors
3. Use more specific selectors or wait states

### Login fails
- Verify credentials in `src/config.ts`
- Check if application is accessible
- Increase navigation timeout in config

## Advanced Usage

### Run specific test scenario

```bash
npx cucumber-js features/warehouse-inbound-purchase-orders.feature --name "Navigate to Purchase Orders"
```

### Run with specific tags

Add tags to feature file and run:
```bash
npx cucumber-js features --tags "@critical"
```

## CI/CD Integration

For continuous integration, set environment variable:
```bash
CI=true npm run test:bdd
```

This will:
- Retry failed tests
- Use single worker for stability
- Generate reports

## Contributing

When adding new test scenarios:
1. Add feature description to `.feature` file
2. Implement step definitions in `step_definitions/` folder
3. Create/update page objects for new pages
4. Run tests to verify new scenarios

## Useful Resources

- [Playwright Documentation](https://playwright.dev)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)
- [Playwright Codegen Guide](https://playwright.dev/docs/codegen)

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review generated screenshots/videos
3. Check console logs in Playwright Inspector
4. Consult Playwright documentation

---

**Project:** Manhattan UI Inbound Test Automation  
**Created:** March 13, 2026  
**Framework:** Playwright + Cucumber/BDD + TypeScript
