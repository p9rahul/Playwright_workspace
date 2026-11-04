import { customTest } from "../../Utils/test-base-Fixture"

customTest('Check Fixture test data', async ({ page, testDataFixture }) => {


    console.log(testDataFixture.userName);
    console.log(testDataFixture.password);
    console.log(testDataFixture.product);

    page.goto("https://rahulshettyacademy.com/");
    page.title();
    page.close();
})