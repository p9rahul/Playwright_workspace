import { test, type Page, request } from "@playwright/test";
import { ApiUtils } from "./ApiUtils";

const loginPayload = { userEmail: "p9rahul@zohomail.in", userPassword: "Rahul@123" };
const createOrderpayload = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
// let response: any;

export const customeTest = test.extend<{ authenticatePageFixture: Page, createOrderFixture: any, testDataFixture: any }>
    ({

        /*Fixture-2 "authenticatePage" - This is a custom fixture which will be used in the test case,
         so that we can use this fixture in any test case and we can avoid writing login code again and again
         in all test cases. 
        - We can use this fixture in any test case by importing it from the file where it is defined.
        */
        authenticatePageFixture: async ({ browser }, use: any) => {

            const context = await browser.newContext();
            const page = await context.newPage();

            const email = "p9rahul@zohomail.in";
            const password = "Rahul@123";

            await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
            const txtuserEmail = page.locator("id=userEmail");
            const txtuserPassword = page.locator("id=userPassword");
            const btnLogin = page.locator("id=login");

            await txtuserEmail.fill(email);
            await txtuserPassword.fill(password);
            await btnLogin.click();

            /*** Add wait for all elements to load ***/
            await page.waitForLoadState("networkidle");
            await page.locator("css=.card-body b").first().waitFor({ state: "visible" });

            await use(page);
            /*  Above this use statement -> setup code,
                Below this use statement -> teardown code like AfterAll, AfterEach, etc.
                which will be executed after the test case is executed.
            */
            // Teardown - to release memeory
            await context.close();
        },


        //  Fixture-2 "createOrder"
        createOrderFixture: async ({ }, use: any) => {
            //************Call Login API & Create Order API ************
            const apiContext = await request.newContext();
            const apiUtils = new ApiUtils(apiContext, loginPayload);
            const response = await apiUtils.createOrder(createOrderpayload);
            await use(response);

            // Teardown - to release memeory
            await apiContext.dispose();
        },

        // Fixture-3
        testDataFixture: {
            productName: "iphone 13 pro",
            country: "India"
        },

    });