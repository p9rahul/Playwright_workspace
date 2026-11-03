// const XLSX = require('xlsx') as typeof import('xlsx');
// const path = require('node:path') as typeof import('node:path');
// import * as path from 'node:path';


import * as XLSX from 'xlsx';

interface UserData {
    ProductName: string;
    Country: string;
    Price: number;
}


/* For "xlsx" library -This method returns "Json" object of the Excel data 
- Best for quick JSON conversion
- Advantage - If you want to quickly dump the Excel contents directly into an array
 of anonymous JSON objects without defining cell-by-cell mappings.
- Disadvantage - Memory consumption can be high for large Excel files, 
                 as the entire sheet is loaded into memory.
-npm install xlsx
- npm install --save-dev typescript @types/node ts-node

*/
class ExcelUtilsSimple {

    excelFilePath: string;


    constructor(excelFilePath: string) {
        this.excelFilePath = excelFilePath;
    }

    public parseExcelToJson(): UserData[] {
        const workbook = XLSX.readFile(this.excelFilePath);
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
            throw new Error(`No worksheets found in: ${this.excelFilePath}`);
        }
        const worksheet = workbook.Sheets[firstSheetName];
        if (!worksheet) {
            throw new Error(`Worksheet "${firstSheetName}" not found in: ${this.excelFilePath}`);
        }

        return XLSX.utils.sheet_to_json<UserData>(worksheet);
    }
}

export { ExcelUtilsSimple };