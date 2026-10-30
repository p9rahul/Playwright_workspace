import { Browser, Page, test, expect } from "@playwright/test";
import { chromium } from "playwright";

test("Tooltip Test", async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://demo.guru99.com/test/tooltip.html");

    const downloadBtn = page.locator('xpath=//a[@id="download_now"]');
    await downloadBtn.hover();

    const tooltip = page.locator("[style*='block']");
    await tooltip.first().waitFor();

    const tooltipText = await tooltip.first().textContent();
    console.log("Tooltip Text: " + tooltipText);

    expect(tooltipText?.trim()).toContain("flowplayer-3.2.7.zip");


    await page.waitForTimeout(3000);
    await browser.close();
});