import { Browser, expect, test } from "@playwright/test";
import { readExcel, writeExcelTest } from "../02RahulSe/Utils/Excel_Read_write_Utils";

test('Upload download excel validation', async ({ page }) => {
    const textSearch = 'Mango';
    const updateValue = '350';

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const dl = await download;
    const filePath = '/Users/rahulshetty/downloads/download.xlsx'; // or await dl.path()

    // ✅ Ensure the edit finishes before upload
    await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);

    await page.locator('#fileinput').setInputFiles(filePath);

    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});
