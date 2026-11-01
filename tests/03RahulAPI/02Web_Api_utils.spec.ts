import { Browser, expect, request, test } from "@playwright/test";
import { chromium } from "@playwright/test";
import { ApiUtils } from "../02RahulSe/Utils/ApiUtils";


const loginPayload = { userEmail: "p9rahul@zohomail.in", userPassword: "Rahul@123" };
const createOrderpayload = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
// let token: any;
// let orderID: any;

let response: any;
test.beforeAll(async () => {

    //************Call Login API & Create Order API ************
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(createOrderpayload);
})

//To baypass login page using API->Result faster
test("Validate login with API", async ({ page }) => {
    console.log("Login Token :", response.token);
    console.log("Order ID =", response.orderID);


    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token)

    await page.goto("https://rahulshettyacademy.com/client/");
    // // const email = "p9rahul@zohomail.in";
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        console.log("Row Order ID :", rowOrderId);
        if (response.orderID === rowOrderId) {

            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(response.orderID === orderIdDetails).toBeTruthy();

});


