import { Browser, Page, test } from "@playwright/test";
import { chromium } from "playwright";

test("Locator Test", async () => {

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // await page.goto("https://demo.guru99.com/test/drag_drop.html");

    // // Drag & Drop using mouse actions
    // const source = page.locator('xpath=//a[text()=" 5000"]');
    // const target = page.locator('xpath=//ol[@id="amt7"]');

    // await source.dragTo(target);
    // await page.waitForTimeout(3000);

    /*//2.Double click on the element
    await page.goto("https://demo.guru99.com/test/simple_context_menu.html");
    const doubleClickElement = page.getByText('Double-Click Me To See Alert');

    await doubleClickElement.dblclick();
    page.once("dialog", async (dialog) => {
        const alertText = dialog.message();
        console.log("Alert Text : " + alertText);
        await dialog.accept();
    });
    */


    // 3. Right click on the element
    await page.goto("https://the-internet.herokuapp.com/context_menu");
    await page.locator('xpath=//div[@id="hot-spot"]').click({ button: 'right' });
    page.once("dialog", async (dialog) => {
        const alertText = dialog.message();
        console.log("Alert Text : " + alertText);
        await dialog.accept();
    });

    //4.Shift + Click on the element
    await page.goto("https://the-internet.herokuapp.com/shifting_content");
    await page.getByText('Example 1: Menu Element').click({ modifiers: ['Shift'] });

    await page.waitForTimeout(3000);
    await browser.close();

})