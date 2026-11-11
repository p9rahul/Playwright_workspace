import fs from 'fs';
import * as path from 'path';

type PlaceholderValue = string | number | boolean;

export function jsonPlaceHolder(
    replacements: Record<string, PlaceholderValue>,
): unknown {

    const payloadPath = path.join(
        process.cwd(),
        'tests',
        'testData',
        'JsonData',
        'apiPayload_template.json',
    );
    const template: unknown = JSON.parse(fs.readFileSync(payloadPath, 'utf-8'));

    return replaceValues(template, replacements);
}

function replaceValues(
    input: unknown,
    replacements: Record<string, PlaceholderValue>,
): unknown {
    if (typeof input === 'string') {
        return input.replace(/\{\{(.*?)\}\}/g, (placeholder, key: string) => {
            const value = replacements[key];
            return value === undefined ? placeholder : String(value);
        });
    }

    if (Array.isArray(input)) {
        return input.map(item => replaceValues(item, replacements));
    }

    if (input !== null && typeof input === 'object') {
        return Object.fromEntries(
            Object.entries(input).map(([key, value]) => [
                key,
                replaceValues(value, replacements),
            ]),
        );
    }

    return input;
}
