import { expect, Locator, Page } from '@playwright/test';

export class TopMenuPage {
    readonly page: Page;
    readonly getStartedLink: Locator;
    readonly nodeLink: Locator;
    readonly javaLink: Locator;
    readonly nodeLabel: Locator;
    readonly javaLabel: Locator;
    readonly nodeDescription: string = 'Installing Playwright';
    readonly javaDescription: string = 'Playwright is distributed as a set of N';

    constructor(page: Page) {
        this.page = page;
        this.getStartedLink = page.getByRole('link', { name: 'Get started' });
        this.nodeLink = page.getByRole('button', { name: 'Node.js' });
        this.javaLink = page.getByRole('navigation', { name: 'Main' }).getByText('Java');
        this.nodeLabel = page.getByText(this.nodeDescription, { exact: true });
        this.javaLabel = page.getByText(this.javaDescription);
    }

    // Actions
    async hoverNode() {
        await this.nodeLink.hover();
    }

    async clickJava() {
        await this.javaLink.click();
    }

    // Assertions
    async assertPageUrl(pageUrl: RegExp) {
        await expect(this.page).toHaveURL(pageUrl);
    }

    async assertNodeDescriptionNotVisible(options?: { timeout?: number }) {
        await expect(this.nodeLabel).not.toBeVisible(options);
    }

    async assertJavaDescriptionVisible(options?: { timeout?: number }) {
        await expect(this.javaLabel).toBeVisible(options);
    }
}

export default TopMenuPage;