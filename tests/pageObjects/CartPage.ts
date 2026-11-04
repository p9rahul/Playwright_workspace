import { Locator, Page, expect } from "@playwright/test";


class CartPage {

    private page: Page;
    private cartProducts: Locator;
    private productsText: Locator;
    private cart: Locator;
    private orders: Locator;
    private checkout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");
    }

    async VerifyProductIsDisplayed(productName: any) {

        // await this.cartProducts.waitFor(); giveing error
        // this.page.waitForTimeout(5000);
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();

    }

    async Checkout() {
        await this.checkout.click();
    }

    getProductLocator(productName: any) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }
}

export { CartPage };