import { Browser, expect, test } from "@playwright/test";
import { chromium } from "@playwright/test";

test("Alert popUp test", async () => {

    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //Goto and navigate functions()
    /*
    await page.goto("https://www.google.com/");
    await page.goBack();
    await page.goForward();
    */

    /*Alert/Dailog popup
    -> Write this line only one place like accpet or message 
    where ever in this page this dailog event triggers this code will handle
    
    
    or , use this // Trigger 2 times for alert and confirm
    page.on('dialog', dialog => dialog.accept());
    page.on('dialog', dialog => console.log(dialog.message())); 
    */
    page.on('dialog', dialog => {
        const dialogMessage = dialog.message();
        // dialog.dismiss();
        dialog.accept();
        console.log(dialogMessage);
    });
    await page.locator("#confirmbtn").click();
    await page.locator("#alertbtn").click();


    /*
    ********Frame**********
    iframe or frameset
    - create object like page

    */
    const framePage = page.frameLocator('iframe[name="iframe-name"]');
    await framePage.getByRole('link', { name: 'NEW Learning paths' }).click()

    //get text and validate
    const textLocator = framePage.locator("xpath=//div[contains(text(),'A Learning Path is a selection')]");
    await textLocator.waitFor({ state: "visible" });
    const msg1 = await textLocator.textContent();
    console.log(msg1);
    expect(msg1).toContain("mastering a particular subject or program");


});