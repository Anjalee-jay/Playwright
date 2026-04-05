# Playwright Testing Project

## Overview
Playwright is a Node.js library to automate browsers. This project aims to demonstrate its capabilities through comprehensive testing.

## Features
- Multi-browser support (Chromium, Firefox, WebKit)
- Headless and headful modes
- Auto-waiting for elements to be ready
- Powerful API for interacting with pages

## Installation
To get started with Playwright, follow the installation instructions below:

1. Clone this repository:
   ```bash
   git clone https://github.com/Anjalee-jay/Playwright.git
   cd Playwright
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage
To run the tests, use the following command:
```bash
npx playwright test
```

## Writing Tests
### Example Test
Here's a simple example to get you started with writing tests in Playwright:

```javascript
const { test, expect } = require('@playwright/test');

test('homepage has Playwright in title', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Playwright/);
});
```

## Contributing
Contributions are welcome! Please read our contribution guidelines for more details.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries, feel free to reach out to [Anjalee-jay](https://github.com/Anjalee-jay).