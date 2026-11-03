import * as ExcelJS from 'exceljs';

type CellPosition = { row: number; column: number };
type CellChange = { rowChange?: number; colChange?: number };

class ExcelUtils_ExcelJS {
    excelFilePath: string;
    workBookSheet?: string;

    constructor(excelFilePath: string, workBookSheet?: string) {
        this.excelFilePath = excelFilePath;
        this.workBookSheet = workBookSheet;
    }

    private async loadWorkbook() {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(this.excelFilePath);
        return workbook;
    }

    private getWorksheet(workbook: ExcelJS.Workbook) {
        const worksheet = this.workBookSheet
            ? workbook.getWorksheet(this.workBookSheet)
            : workbook.worksheets[0];

        if (!worksheet) {
            const sheetName = this.workBookSheet ?? 'first worksheet';
            throw new Error(`Worksheet "${sheetName}" not found in: ${this.excelFilePath}`);
        }

        return worksheet;
    }

    private findCell(worksheet: ExcelJS.Worksheet, searchText: ExcelJS.CellValue): CellPosition {
        let output = { row: -1, column: -1 };

        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, columnNumber) => {
                if (cell.value === searchText) {
                    output = { row: rowNumber, column: columnNumber };
                }
            });
        });

        return output;
    }

    public async loadSheet(): Promise<ExcelJS.Worksheet> {
        const workbook = await this.loadWorkbook();
        return this.getWorksheet(workbook);
    }

    public async excelTest(): Promise<void> {
        const worksheet = await this.loadSheet();

        worksheet.eachRow((row, rowNumber) => {
            console.log(`Row ${rowNumber}: ${row.values}`);
        });
    }

    public async readExcel(searchText: ExcelJS.CellValue): Promise<CellPosition> {
        const worksheet = await this.loadSheet();
        return this.findCell(worksheet, searchText);
    }

    public async writeExcelTest(
        searchText: ExcelJS.CellValue,
        replaceText: ExcelJS.CellValue,
        change: CellChange = {}
    ): Promise<void> {
        const workbook = await this.loadWorkbook();
        const worksheet = this.getWorksheet(workbook);
        const position = this.findCell(worksheet, searchText);

        if (position.row === -1) {
            throw new Error(`Value "${searchText}" not found in worksheet "${worksheet.name}"`);
        }

        const row = position.row + (change.rowChange ?? 0);
        const column = position.column + (change.colChange ?? 0);
        if (row < 1 || column < 1) {
            throw new RangeError(`Invalid target cell position: row ${row}, column ${column}`);
        }

        console.log("Cell value Before update-", worksheet.getCell(row, column).value);
        worksheet.getCell(row, column).value = replaceText;
        await workbook.xlsx.writeFile(this.excelFilePath);
        console.log("Cell value After update-", worksheet.getCell(row, column).value);


    }
}

export { ExcelUtils_ExcelJS };
