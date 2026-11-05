import { test, expect } from "@playwright/test";
import { POManager } from "../pageObjects/POManager";
import dataSet from "../testData/JsonTestData.json";// [Json -> string -> Js Object]

test('@Web Validate this test using page object pattern', async ({ page }) => {

    // Not required - Reading data from Json file
    // const email = "p9rahul@zohomail.in";
    // const password = "Rahul@123";
    // const productName = 'ZARA COAT 3';

    // const loginPage = new LoginPage(page);
    // await loginPage.goTo();
    // await loginPage.login(email, password);

    // const dashboardPage = new DashboardPage(page);
    // await dashboardPage.searchProductAddCart(productName);
    // await dashboardPage.navigateToOrders();

    // Replace above code with POM
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.login(dataSet[0].email, dataSet[0].password);

    //Dashboard
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(dataSet[0].productName);
    await dashboardPage.navigateToOrders();

    //Cart Page
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(dataSet[0].productName);
    await cartPage.Checkout();

    // Order Review page
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    //Order History page
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(await ordersHistoryPage.getOrderId()).toBe(orderId);
    // expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy(); JS code

})

test.describe.configure({ mode: 'serial' })
test('Read data from Json file', async () => {

    console.log(dataSet[0].email);
    console.log(dataSet[0].password);
    console.log(dataSet[0].productName);
})

for (const data of dataSet)
    test(`Execute test for multiple set of data ${data.productName}`, async () => {

        console.log(data.email);
        console.log(data.password);
        console.log(data.productName);
    })


