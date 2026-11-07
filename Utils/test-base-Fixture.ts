import { test as baseTest } from "@playwright/test";


//this is test data in side fixture. Now call it from test example"04FixtureDemo1.spec.ts"
export const customTest = baseTest.extend<{ testDataFixture: any }>({
    testDataFixture: async ({ }, use: any) => {
        await use({
            userName: "Rahul#gamil.com",
            password: "Test@123",
            product: "Apple 18 pro",
        });
    },
});