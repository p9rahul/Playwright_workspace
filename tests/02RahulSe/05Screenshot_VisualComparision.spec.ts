import { Browser, expect, test } from "@playwright/test";

test("Validate Screnhot & visual comparison", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();

    //Take screenshot of the element or locator level
    await page.locator("#displayed-text").screenshot({ path: "tests/02RahulSe/MyScreenshots/Hide_Show_Element.png" });
    await page.locator("#hide-textbox").click();

    //Take screenshot of the page
    await page.screenshot({ path: "tests/02RahulSe/MyScreenshots/Screenshot_VisualComparision.png", fullPage: true });

    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.close();
});

/*Take screenshot of the page and compare with the baseline image
 -If not present then 1st it will take the screenshot and save it as baseline image 
 - next time it will compare with the baseline image
 */
test("Validate visual comparison", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();

    expect(await page.screenshot()).toMatchSnapshot('landing.png');

})