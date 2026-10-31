import { Browser, expect, test } from "@playwright/test";
import { chromium } from "playwright";

test("End to End automation", async () => {
    const browser: Browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    const email = "p9rahul@zohomail.in";


    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");


    const txtuserEmail = page.locator("id=userEmail");
    const txtuserPassword = page.locator("id=userPassword");
    const btnLogin = page.locator("id=login");

    await txtuserEmail.fill(email);
    await txtuserPassword.fill("Rahul@123");
    await btnLogin.click();

    const pageTitle = await page.title();
    console.log("Page Title:", pageTitle);

    const blinkingText = await page.locator("xpath=//a[@class='blinkingText']").textContent();
    console.log("Blinking Text:", blinkingText);
    expect(blinkingText).toContain("I'll help you prepare for your next QA job — Explore the QA Career Accelerator.");


    /*** Add wait for all elements to load ***/
    await page.waitForLoadState("networkidle");
    await page.locator("css=.card-body b").first().waitFor({ state: "visible" });
    /***********
     * - add product to cart dynamically
     * Chain locator - Here page is main locator and we are chaining it with child locator to get the product name
     * products.nth(i) - This will return the product at index i
     * Inside the product locator -> search for Name of product using child locator
     * products.nth(i).locator("css=b")
    ***********/
    const productName = "iphone 13 pro";
    const products = page.locator("css=.card-body");  //This will return all the products on the page -Array of products
    const count = await products.count();
    console.log("Total Products:", count);

    // const titles = await page.locator("css=.card-body b").allTextContents();
    // console.log("Product Titles:", titles);

    for (let i = 0; i < count; ++i) {

        //Chain locator - One locator to another locator
        if (await products.nth(i).locator("css=b").textContent() === productName) {
            await products.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }
    // await page.pause();

    //Verify product is added to cart
    await page.locator("css=[routerlink*='cart']").click();

    // #Wait -> For this element auto wait doesn't work so add waitFor a element
    await page.locator("div li img").first().waitFor();
    const cartProductName = await page.locator("css=.cartSection h3").textContent();
    expect(cartProductName).toContain(productName);

    // #Checkout ->
    await page.locator("text=Checkout").click();
    //Shipping information
    await page.locator("css=input[placeholder='Select Country']").pressSequentially("ind", { delay: 100 });
    const dropdownOptions = page.locator(".ta-results");
    await dropdownOptions.waitFor();
    const optionsCount = await dropdownOptions.locator("button").count();


    //Again chain locator - Here dropdownOptions is main locator and we are chaining it with child locator to get the button text
    for (let i = 0; i < optionsCount; ++i) {
        const optionText = await dropdownOptions.locator("button").nth(i).textContent();
        if (optionText?.trim() === "India") {
            await dropdownOptions.locator("button").nth(i).click();
            break;
        }
    }
    //  Place order button
    await page.waitForTimeout(2000);
    await page.getByText("Place Order ").click();

    //#Validate Eamil
    const checkoutEmail = await page.locator("css=.user__name [type='text']").first().textContent();
    expect(checkoutEmail).toBe(email);
    console.log("Checkout Email:", checkoutEmail);

    // #Fetch Order ID
    const thankyouMsg = await page.locator(".hero-primary").textContent();
    expect(thankyouMsg).toContain("Thankyou for the order.");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order ID:", orderID);
    // await page.pause();


    //Move to order History page and verify order is present in order history
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("css=tr").first().waitFor();
    const orderHistoryCount = await page.locator("css=tr").count();
    console.log("Order History Count:", orderHistoryCount);
    // await page.pause();


    for (let i = 0; i < orderHistoryCount; ++i) {
        //tr:nth-child(1) th
        //tr:nth-child(2) button [but here 2 button so write first()]
        //   //tr[2]/td//button[text()='Delete']
        //await page.locator('tr').nth(0).locator('button', { hasText: 'Delete' }).click();
        const orderHistoryID = await page.locator("css=tr").nth(i).locator("th").first().textContent();
        const orderHistoryID1 = orderHistoryID?.replaceAll("|", "",);
        console.log(orderHistoryID1);
        console.log("newOrderID", orderHistoryID1);

        const orderID1 = orderID?.replaceAll("|", "",);

        if (orderHistoryID1?.trim() === orderID1?.trim()) {
            await page.locator("css=tr").nth(i).locator("button").first().click();
            console.log("Order Exist in order History.");
            break;
        }
    }
    // await page.pause();


    //Signout --> //Check login page content after sign out
    // await page.waitForTimeout(5000);
    // await page.getByText(" Sign Out ").click();
    // const loginPageTitle = await page.getByText("Practice Website for").textContent();
    // expect(loginPageTitle).toContain("Practice Website for Rahul Shetty Academy Students");
    await browser.close();
});