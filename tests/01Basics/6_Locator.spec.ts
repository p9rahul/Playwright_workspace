import { Browser, Page, test } from "@playwright/test";
import { chromium } from "playwright";

test("Locator Test", async () => {

    const browser = await chromium.launch({ headless: false });
    // const browserContext = await browser.newContext();
    const page = await browser.newPage();

    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");

    // Using Locator
    const txtFN = page.locator('id=input-firstname');
    const txtLN = page.locator('css=#input-lastname');
    const txtEmail = page.locator('css=#input-email');
    const txtPhone = page.locator('xpath=//input[@name="telephone"]');
    const btnContinue = page.locator('xpath=//input[@type="submit"]');

    await txtFN.fill("Rahul");
    await txtLN.fill("Kumar");
    await txtEmail.fill("rahul.kumar@example.com");
    await txtPhone.pressSequentially("1234567890", { delay: 1000 }); // Char BY char will be entered
    await btnContinue.click();

    await page.waitForTimeout(5000);
    await browser.close();

})