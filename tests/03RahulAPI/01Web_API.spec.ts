import { Browser, expect, request, test } from "@playwright/test";
import { chromium } from "@playwright/test";

const urlLogin = "https://rahulshettyacademy.com/api/ecom/auth/login";
const urlCreateorder = "https://rahulshettyacademy.com/api/ecom/order/create-order";
const loginPayload = { userEmail: "p9rahul@zohomail.in", userPassword: "Rahul@123" };
const createOrderpayload = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
let token: any;
let orderID: any;


test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(urlLogin,
        {
            data: loginPayload
        });

    expect(loginResponse.ok()).toBeTruthy();
    const loginJsonResponse = await loginResponse.json();
    token = loginJsonResponse.token;

    //************Create order Using API and validate order number in order History************
    const createOrderAPI_Response = await apiContext.post(urlCreateorder,
        {
            data: createOrderpayload,
            headers: {
                'Authorization': token,
                'content-type': 'application/json'
            }
        });

    const orderResponseJson = await createOrderAPI_Response.json()
    orderID = orderResponseJson.orders[0];


})

//To baypass login page using API->Result faster
test("Validate login with API", async ({ page }) => {
    console.log("Login Token :", token);
    console.log("Order ID =", orderID);

    /*
    Add token to this test case 
    -insert into local browser storage in browser appliction DOM tab
    -bypass login screen
    -store session info
    */

    // page.addInitScript(value => {
    //     window.localStorage.setItem('token', value)
    // }, token)

    // await page.goto("https://rahulshettyacademy.com/client/");
    // // const email = "p9rahul@zohomail.in";
})



