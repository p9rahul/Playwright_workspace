import { expect, test } from '@playwright/test';
import path from 'node:path';
import { readExcel } from './ReadExcel_map';

interface Product {
    name: string;
    country: string;
    price: number;
}

//npx playwright test tests/00TypescriptBasics/04ReadExcel.spec.ts
test('reads sample data from Excel', () => {
    const filePath = path.resolve(__dirname, '..', 'testData', 'SampleData.xlsx');
    const products = readExcel<Product>(filePath, {
        mapRow: (row) => ({
            name: String(row.ProductName),
            country: String(row.Country),
            price: Number(row.Price),

        }),
    });

    console.log(products);
    console.log(products[0].name, products[0].country, products[0].price);

    // expect(products).toEqual([
    //     { name: 'iPhone 13 Pro', country: 'India', price: 999 },
    //     { name: 'Pixel 8', country: 'USA', price: 699 },
    //     { name: 'Samsung', country: 'Koria', price: 563 },
    //     { name: 'Nokia', country: 'China', price: 895 },
    //     { name: 'iPhone 16', country: 'India', price: 1200 },
    //     { name: 'iPhone 17 Pro', country: 'China', price: 1244 },
    // ]);
});