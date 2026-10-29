import { Browser, BrowserContext, expect, test } from "@playwright/test";
import { chromium } from "playwright";


test("First Test", async () => {

    const browser: Browser = await chromium.launch({ headless: false });
    const bc: BrowserContext = await browser.newContext();

    const page = await bc.newPage();
    await page.goto("https://www.google.com/");
    const title = await page.title();
    console.log(title);

    await expect(page).toHaveTitle("Google");

    // Wait for 5 seconds
    await page.waitForTimeout(5000);
    await browser.close();
});