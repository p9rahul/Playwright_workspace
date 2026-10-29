import { Browser, test, BrowserContext } from '@playwright/test';
import { chromium } from 'playwright';



/* Direct URL way-1
await page.goto("https:admin:admin//the-internet.herokuapp.com/basic_auth");
*/

// IQ- When password has @ then we can not pass username and password in URL directly
test("Basic Auth Test using httpCredentials Way-1", async () => {
    const browser: Browser = await chromium.launch({ headless: false });
    const bContext: BrowserContext = await browser.newContext({
        httpCredentials: {
            username: "admin",
            password: "admin"
        }
    });
    const page = await bContext.newPage();

    await page.goto("https://the-internet.herokuapp.com/basic_auth");
    const title = await page.title();
    console.log("Basic Auth Page Title: " + title);

    await page.waitForTimeout(3000);
    await bContext.close();
    await browser.close();
});

test("Way-2 setExtraHTTPHeaders", async () => {
    const browser: Browser = await chromium.launch({ headless: false });
    const bContext: BrowserContext = await browser.newContext();
    const page = await bContext.newPage();

    // 
    const username = "admin";
    const password = "admin";
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);
    await page.setExtraHTTPHeaders(
        { 'Authorization': authHeader }
    );
    await page.goto("https://the-internet.herokuapp.com/basic_auth");
    // await new Promise(() => { }); //Not required this line

    const title = await page.title();
    console.log("Basic Auth Page Title: " + title);

    await page.waitForTimeout(9000);
    await bContext.close();
    await browser.close();
})