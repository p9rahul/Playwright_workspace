import * as XLSX from 'xlsx';

export type ExcelRow = Record<string, unknown>;

export interface ReadExcelOptions<T> {
    sheetName?: string;
    mapRow?: (row: ExcelRow, index: number) => T;
}

/** Reads a worksheet with its first row as headers and maps the remaining rows. */
export function readExcel<T = ExcelRow>(
    filePath: string,
    options: ReadExcelOptions<T> = {},
): T[] {
    const workbook = XLSX.readFile(filePath);
    const sheetName = options.sheetName ?? workbook.SheetNames[0];

    if (!sheetName) throw new Error(`No worksheets found in: ${filePath}`);

    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) throw new Error(`Worksheet "${sheetName}" not found in: ${filePath}`);

    const rows = XLSX.utils.sheet_to_json<unknown[]>(worksheet, {
        header: 1,
        defval: '',
    });
    const headers = (rows[0] ?? []).map((value) => String(value ?? '').trim());

    const result: T[] = [];

    for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
        const values = rows[rowIndex];
        if (!values.some((value) => value !== '' && value != null)) continue;

        const row: ExcelRow = {};
        for (let columnIndex = 0; columnIndex < headers.length; columnIndex++) {
            const header = headers[columnIndex];
            if (header) row[header] = values[columnIndex] ?? '';
        }

        result.push(options.mapRow ? options.mapRow(row, result.length) : row as T);
    }

    return result;
}
