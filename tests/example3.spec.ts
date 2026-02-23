import { test, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { TopMenuPage } from '../pages/top-menu-page';
import {
    BatchInfo,
    Configuration,
    EyesRunner,
    ClassicRunner,
    VisualGridRunner,
    BrowserType,
    DeviceName,
    ScreenOrientation,
    Eyes,
    Target
} from '@applitools/eyes-playwright';

const URL = 'https://playwright.dev/';
const pageUrl = /.*intro/;

let homePage: HomePage;
let topMenuPage: TopMenuPage;

// Applitools setup variables
export const USE_ULTRAFAST_GRID = false;
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;

test.beforeAll(async () => {
    // Initialize Runner
    Runner = USE_ULTRAFAST_GRID ? new VisualGridRunner({ testConcurrency: 5 }) : new ClassicRunner();
    const runnerName = USE_ULTRAFAST_GRID ? 'Ultrafast Grid' : 'Classic runner';

    // Setup batch
    Batch = new BatchInfo({ name: `Playwright website - ${runnerName}` });
    Config = new Configuration();
    Config.setBatch(Batch);

    // Add browsers/devices if using Ultrafast Grid
    if (USE_ULTRAFAST_GRID) {
        Config.addBrowser(800, 600, BrowserType.CHROME);
        Config.addBrowser(1600, 1200, BrowserType.FIREFOX);
        Config.addBrowser(1024, 768, BrowserType.SAFARI);
        Config.addDeviceEmulation(DeviceName.iPhone_11, ScreenOrientation.PORTRAIT);
        Config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
    }
});

test.afterAll(async () => {
    // Get all test results from the runner
    const results = await Runner.getAllTestResults(false);
    console.log('Visual test results', results);
});

// Helper function to initialize Eyes per test
async function initEyes(page: Page, testName: string): Promise<Eyes> {
    const eyes = new Eyes(Runner, Config);
    await eyes.open(page, 'Playwright', testName, { width: 1024, height: 768 });
    return eyes;
}

// Helper Action
async function clickGetStarted(page: Page) {
    await homePage.clickGetStarted();
    topMenuPage = new TopMenuPage(page);
}

// --- Tests ---
test('has title', async ({ page }) => {
    const eyes = await initEyes(page, test.info().title);

    homePage = new HomePage(page);
    await page.goto(URL);

    await eyes.check('Home page', Target.window().fully());
    await eyes.close();
});

test('get started link', async ({ page }) => {
    const eyes = await initEyes(page, test.info().title);

    homePage = new HomePage(page);
    await page.goto(URL);

    await clickGetStarted(page);
    await topMenuPage.assertPageUrl(pageUrl);

    await eyes.check('Get Started page', Target.window().fully().layout());
    await eyes.close();
});

test('check Java page', async ({ page }) => {
    const eyes = await initEyes(page, test.info().title);

    homePage = new HomePage(page);
    await page.goto(URL);

    await clickGetStarted(page);

    await test.step('Act', async () => {
        await topMenuPage.hoverNode();
        await topMenuPage.clickJava();
    });

    await test.step('Assert', async () => {
        await topMenuPage.assertPageUrl(pageUrl);
        await topMenuPage.assertNodeDescriptionNotVisible();
        await topMenuPage.assertJavaDescriptionVisible({ timeout: 10000 }); // increase timeout for visibility
    });

    await eyes.check('Java page', Target.window().fully().ignoreColors());
    await eyes.close();
});