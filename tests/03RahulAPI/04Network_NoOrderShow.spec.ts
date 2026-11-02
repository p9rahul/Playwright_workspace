/*
-Intercept Response calls with Playwright route method
Here on orders page - order History details will be there 
-Now, we have to apply a logic that none of orders should be there in the order history page,
 if we have not placed any order yet. But Acutally for a user orders Exist.

Solution - intercept Network response & route method and its parameters
Output message - You have No Orders to show at this time. Please Visit Back Us 


68. How to intercept Network response calls with Playwright route method
69. Understand the playwright route method and its parameters in intercepting - demo


*/

import { expect, request, test } from "@playwright/test";
import { ApiUtils } from "../02RahulSe/Utils/ApiUtils";

const loginPayload = { userEmail: "p9rahul@zohomail.in", userPassword: "Rahul@123" };
const createOrderpayload = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response: any;
test.beforeAll(async () => {

    //************Call Login API & Create Order API ************
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(createOrderpayload);
    //Above - Here ideally no need to create order, but we are creating order to get the token from login API
})

test('@SP Place the order', async ({ page }) => {
    console.log("Login Token :", response.token);
    console.log("Order ID =", response.orderID);

    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");

    //Here we nned - Intercepting the API response
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,

                });
            //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
        });

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

    await page.pause();
    console.log(await page.locator(".mt-4").textContent());
});