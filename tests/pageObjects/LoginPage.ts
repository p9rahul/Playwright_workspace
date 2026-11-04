import type { Locator, Page } from "@playwright/test";

/*Here page has no lifecycle So it is will come from called calss.
    1.Create a Page object folder 
    2.Create constructor and add "page" paramenter that will come from called class
    3. Define all page locators and actions 
    4. Export this class - Not reequired
    5. Go to test case and call this 
    6.import this class So it will activate there
    7. call required functions

    */

export class LoginPage {
    private readonly page: Page;
    private readonly signInButton: Locator;
    private readonly userName: Locator;
    private readonly password: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goTo(): Promise<void> {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async login(username: string, password: string): Promise<void> {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
    }
}

// export { LoginPage };
