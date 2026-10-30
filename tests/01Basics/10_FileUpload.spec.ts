import { Browser, Page, test, expect } from "@playwright/test";
import { chromium } from "playwright";
import path from "path";

test("File Upload Test", async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://demo.guru99.com/test/upload/");


    // upload 1 file
    const filePath1 = "C:\\Users\\pc\\Rahul\\PlaywrightFolder\\Playwright_workspace\\tests\\testData\\file1.txt";
    const uploadFile = page.locator('input[name="uploadfile_0"]');
    // await uploadFile.setInputFiles(filePath1);

    // upload 2 files
    const filePath2 = "C:\\Users\\pc\\Rahul\\PlaywrightFolder\\Playwright_workspace\\tests\\testData\\file2.txt";
    await uploadFile.setInputFiles([path.join(filePath1), path.join(filePath2)]);


    await page.waitForTimeout(3000);
    await browser.close();
});