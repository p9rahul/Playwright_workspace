const text = "  | 6ae5ff44a90a419aa837c2e4 | ";
const text1 = text.replaceAll("|", "",);
console.log(text1);

const OrderID = "6ae76f2b92a4341c4cfc433b";
const RowOrderID = "6ae76f2b92a4341c4cfc433b";
if (OrderID === RowOrderID) {
    console.log("Order ID is matching");
}