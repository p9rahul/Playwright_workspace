/*
Intercept Network request calls with Playwright route method
71. How to intercept Network request calls with Playwright - Example demo

- In this example, We will intercept the newtwork request call
- route a different URL -order that is not present for a login user

*/

import { expect, request, test } from "@playwright/test";


test('@QW Security test request intercept', async ({ page }) => {

    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("p9rahul@zohomail.in");
    await page.locator("#userPassword").fill("Rahul@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    /*    Below code will get all ends point request , response and status code in console     */
    page.on('request', request => console.log('>> - Request 👍', request.method(), request.url()));
    page.on('response', response => console.log('<< - Response 👍', response.status(), response.url()));


    await page.locator("button[routerlink*='myorders']").click();
    //So if the app requests order details with a different ID, this code substitutes 621661f884b053f6765465b6. 
    // It doesn’t mock the response; the server still handles the request.
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

    // await page.pause();

});