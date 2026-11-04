import { Locator, Page } from "@playwright/test";

class DashboardPage {

    private page: Page;
    private products: Locator;
    private productsText: Locator;
    private cart: Locator;
    private orders: Locator;



    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async searchProductAddCart(productName: any) {

        const titles = await this.productsText.allTextContents();
        console.log("All productName :", titles);
        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {
            /*
            - this is Chain locator So ideally we should not create page object
            - this is not directly dependent on page 
            - it is dependent on a parent locator 
            */
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                //add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToOrders() {
        await this.orders.click();
    }


    async navigateToCart() {
        await this.cart.click();
    }

}

export { DashboardPage };