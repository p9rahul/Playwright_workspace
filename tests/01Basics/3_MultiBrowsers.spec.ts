import { Browser, test, BrowserContext } from '@playwright/test';
import { chromium, firefox, webkit } from 'playwright';

test("Multi Browser Test", async () => {
    const browser: Browser = await chromium.launch({ headless: false });
    const bContext1: BrowserContext = await browser.newContext();
    const page1 = await bContext1.newPage();

    await page1.goto("https://www.google.com/");
    const title1 = await page1.title();
    console.log("Chromium Browser Title: " + title1);

    // Create 2nd browser instance using Firefox 
    const browser2: Browser = await firefox.launch({ headless: false });
    const bContext2: BrowserContext = await browser2.newContext();
    const page2 = await bContext2.newPage();

    await page2.goto("https://rahulshettyacademy.com/documents-request");
    await page2.waitForTimeout(3000);
    const title2 = await page2.title();
    console.log("Firefox Browser Title: " + title2);

    await bContext1.close();
    await bContext2.close();

    await browser.close();

})