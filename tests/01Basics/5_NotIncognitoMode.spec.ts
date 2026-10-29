import { Browser, test, BrowserContext } from '@playwright/test';
import { chromium } from 'playwright';

test("Open Browser in Normal Mode", async () => {

    /*1st argument is user data directory path, 2nd argument is browser type like this
        - const browser: Browser = await chromium.launchPersistentContext("C:\\Users\\Admin\\AppData\\Local\\Google\\Chrome\\User Data", { headless: false });
        -if we pass empty string then it will open browser in incognito mode,
         if we pass user data directory path then it will open browser in normal mode
    */
    const bContext: BrowserContext = await chromium.launchPersistentContext("", { headless: false });
    const pages = bContext.pages();
    const page = pages[0]

    await page.goto("https://www.google.com/");
    const title = await page.title();
    console.log("Google Page Title: " + title);

    await page.waitForTimeout(2000);
    await bContext.close();
})