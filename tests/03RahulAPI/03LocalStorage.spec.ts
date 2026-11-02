

/*
65. How to save session storage using Playwright and inject into new Browser context
Create Broweser context storage state file and use/Inject it in new context to bypass login page
Inject Json storage to new context
-Cokkie will be shared to all test cases in same context

Advantage - Skip login page , Save execution time, Faster execution
- No external plugin required.
- Suppose you have 10 test cases and all are dependent on login page,
 so instead of login in each test case, you can login once 
 and save the session storage and use it in all test cases to bypass login page.

-
*/


import { expect, test } from "@playwright/test";

let webcontext: any;  //Global variable to share context between all test cases

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");

    //Login page
    const email = "p9rahul@zohomail.in";
    const txtuserEmail = page.locator("id=userEmail");
    const txtuserPassword = page.locator("id=userPassword");
    const btnLogin = page.locator("id=login");

    await txtuserEmail.fill(email);
    await txtuserPassword.fill("Rahul@123");
    await btnLogin.click();

    //Wait for network idle
    await page.waitForLoadState("networkidle");
    await page.locator("css=.card-body b").first().waitFor({ state: "visible" });

    //Create storage state file to save session storage
    await context.storageState({ path: "storageState.json" });
    //Here we are injecting all local storage and cookies to new context to bypass login page
    webcontext = await browser.newContext({ storageState: "storageState.json" });
})

test("Validate login with session storage 1", async () => {
    const page = await webcontext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");

    const productName = "iphone 13 pro";
    const products = page.locator("css=.card-body");
    const count = await products.count();
    console.log("Total Products:", count);

})

test("Validate login with session storage 2", async () => {
    const page = await webcontext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");

    const productName = "iphone 13 pro";
    const products = page.locator("css=.card-body");
    const count = await products.count();
    console.log("Total Products:", count);

})