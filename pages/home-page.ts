import { type Locator, type Page, expect } from "@playwright/test";

export class HomePage {
    // Variables
    readonly page: Page;
    readonly getStartedButton: Locator;
    readonly title: RegExp;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.getStartedButton = page.getByRole('link', { name: 'Get started' });
        this.title = /Playwright/;
    }

    // Methods
    async clickGetStarted() {
        await this.getStartedButton.click();
    }

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(this.title);
    }
}

// Optional default export
export default HomePage;