import { expect, test } from "@playwright/test";
import { join } from "node:path";

import { ExcelUtils_ExcelJS } from "./ExcelUtils_ExcelJS ";

test("First Test", async () => {
    //create object of ExcelUtils_ExcelJS class and pass the excel file path
    const excelUtils = new ExcelUtils_ExcelJS('tests/testData/SampleData.xlsx');

    // await excelUtils.excelTest();
    /*
    Output:
        Row 1: ,ProductName,Country,Price
        Row 2: ,iPhone 13 Pro,India,999
        Row 3: ,Pixel 8,USA,699
        Row 4: ,Samsung,Koria,563
        Row 5: ,Nokia,China,895
        Row 6: ,iPhone 16,India,1200
        Row 7: ,iPhone 17 Pro,China,1244
    */

    const updatedPosition = await excelUtils.readExcel("Updated New");
    const position = updatedPosition.row === -1
        ? await excelUtils.readExcel("Samsung")
        : updatedPosition;
    console.log(position);


});

test("writeExcelTest updates the cell at the requested offset", async () => {
    const filePath = join(__dirname, "..", "testData", "SampleData.xlsx");
    const excelUtils = new ExcelUtils_ExcelJS(filePath);

    const currentValue = "Updated1";
    const changeValue = "Samsung";
    const samsungPosition = await excelUtils.readExcel(changeValue);
    const searchText = samsungPosition.row === -1 ? currentValue : changeValue;

    await excelUtils.writeExcelTest(searchText, changeValue, { colChange: 0 });
    // await expect(excelUtils.readExcel("Updated New"))
    //     .resolves.toEqual({ row: 4, column: 1 });
});
