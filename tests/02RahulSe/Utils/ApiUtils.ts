class ApiUtils {
    apiContext: any;
    loginPayload: any;
    createOrderpayload: any;

    constructor(apiContext: any, loginPayload: any) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const urlLogin = "https://rahulshettyacademy.com/api/ecom/auth/login";
        const loginResponse = await this.apiContext.post(urlLogin,
            {
                data: this.loginPayload
            });
        const loginJsonResponse = await loginResponse.json();
        return loginJsonResponse.token;
    }

    async createOrder(createOrderpayload: any) {
        let response: {
            orderID: any;
            token?: string
        } = { orderID: undefined, token: undefined };

        response.token = await this.getToken();
        const urlCreateorder = "https://rahulshettyacademy.com/api/ecom/order/create-order";
        const createOrderAPI_Response = await this.apiContext.post(urlCreateorder,
            {
                data: createOrderpayload,
                headers: {
                    'Authorization': response.token,
                    'content-type': 'application/json'
                }
            });

        const orderResponseJson = await createOrderAPI_Response.json()
        const orderID = orderResponseJson.orders[0];
        response.orderID = orderID;
        return response;
    }

}

export { ApiUtils };