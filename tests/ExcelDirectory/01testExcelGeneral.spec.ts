import { test } from "@playwright/test";

import { ExcelUtilsSimple } from "./ExcelUtilsSimple";

test("First Test", async () => {
    //create object of ExcelUtilsSimple class and pass the excel file path
    const excelUtils = new ExcelUtilsSimple('tests/testData/SampleData.xlsx');
    excelUtils.parseExcelToJson().forEach((data: any) => {
        console.log(`Product Name: ${data.ProductName}, Country: ${data.Country}, Price: ${data.Price}`);
    });

    console.log(excelUtils.parseExcelToJson());

});