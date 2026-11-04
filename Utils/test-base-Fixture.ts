import { test as base } from "@playwright/test";


//this is test data in side fixture. Now call it from test example"test_ClientAppPO.spec.ts"
export const customTest = base.extend<{ testDataFixture: any }>({
    testDataFixture: async ({ }, use: any) => {
        await use({
            userName: "Rahul#gamil.com",
            password: "Test@123",
            product: "Apple 18 pro",
        });
    },
});