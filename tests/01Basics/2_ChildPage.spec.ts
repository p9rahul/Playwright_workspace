import { Browser, expect, test } from "@playwright/test";
import { chromium } from "playwright";

test("Child Page Test", async () => {
    const browser: Browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();

    const mainPage = await context.newPage();
    await mainPage.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentlink = mainPage.locator("[href*='documents-request']");

    await mainPage.waitForTimeout(3000);

    const [childPage] = await Promise.all([
        context.waitForEvent("page"),
        await documentlink.click() // Opens a new tab when clicking on the link
    ]);
    const mainPageTitle = await mainPage.title();
    console.log("Main Page Title: " + mainPageTitle);

    const childPageTitle = await childPage.title();
    console.log("Child Page Title: " + childPageTitle);

    await mainPage.waitForTimeout(2000);
    await browser.close();
})