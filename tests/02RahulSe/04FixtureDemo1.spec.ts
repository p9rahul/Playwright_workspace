import { expect, request, test } from "@playwright/test";
import { customeTest } from "./Utils/Fixture1";

customeTest('Fixture Demo 1', async (
    {
        authenticatePageFixture,
        createOrderFixture,
        testDataFixture

    }) => {
    await authenticatePageFixture.goto("https://rahulshettyacademy.com/client");


    // it will execute once the order is created and we will get the response from the API call
    await authenticatePageFixture.locator("button[routerlink*='myorders']").click();
    await authenticatePageFixture.locator("css=tr").first().waitFor();

    //Consume createOrderFixture in the test case
    console.log("Order ID from API response:", createOrderFixture.orderID);
    await expect(authenticatePageFixture.locator(`xpath=//th[contains(text(), '${createOrderFixture.orderID}')]`)).toBeVisible();

    //Consume the test data fixture in the test case
    console.log("Product Name from Fixture:", testDataFixture.productName);
    console.log("Country Name from Fixture:", testDataFixture.country);
});