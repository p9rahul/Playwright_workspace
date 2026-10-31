import { Browser, test } from "@playwright/test";
import { chromium } from "@playwright/test";

test("Smart locator", async () => {

    const browser: Browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //This are special page method given by playwright to serch locator

    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", { name: "Shop" }).click();

    //Filter mehtod 
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();

    //CSS locator


    /*
    Q) Here When you try to enter password by label then it won't work?
    Answer - password input tag is outside the label.
    DOM-
    <label for= "exampleInputPassword1" > Password </label>
    <input class="form-control" id = "exampleInputPassword1" placeholder = "Password" type = "password" >


    -----------
    Custome Timeout for 
    1.Entire test function 
    2.Action like - click
    3. Assertation -expect

    3 Places we can define Time-outs
    1. Step/element  level
    2. Global level - in config.ts file ex-> Action time outs - like click() action then Define in Config.ts file
    3. Test level
    */
})

