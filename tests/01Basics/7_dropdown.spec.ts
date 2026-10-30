import { Browser, Page, test } from "@playwright/test";
import { chromium } from "playwright";

test("Locator Test", async () => {

    const browser = await chromium.launch({ headless: false });
    // const browserContext = await browser.newContext();
    const page = await browser.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const dropdown = page.locator('xpath=//select[@class="form-control"]');

    await dropdown.selectOption("Teacher");
    await dropdown.selectOption("Student");
    await dropdown.selectOption({ index: 2 });
    await dropdown.selectOption({ value: "teach" });

    // #print all the options in dropdown like this-Student,Teacher,Consultant
    const allOptions = dropdown.locator('option')
    console.log("All Options in Dropdown: " + await allOptions.allTextContents());

    const length = await allOptions.count();
    console.log("Total Options in Dropdown: " + length);

    //iterate through all the options in dropdown and print them one by one
    for (const option of await allOptions.all()) {

        let optionText = await option.textContent();
        if (optionText?.trim() == "Teacher") {
            await dropdown.selectOption(optionText);
            console.log("Selected Teacher Option");
            break;
        }
    }

    await page.waitForTimeout(1000);
    await browser.close();

})