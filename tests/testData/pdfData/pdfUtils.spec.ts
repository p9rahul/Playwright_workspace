import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { PDFDocument } from 'pdf-lib';

test('Update particular field in existing PDF', async () => {
    const pdfPath = path.join(process.cwd(), 'tests', 'testData/pdfData', 'cguProperty-claim-form.pdf');
    const outputPath = path.join(process.cwd(), 'tests', 'testData/pdfData', 'CGU_modified.pdf');
    const outputPath1 = path.join(process.cwd(), 'tests', 'testData/pdfData', 'keys.txt');


    // Read existing PDF
    const existingPDF = fs.readFileSync(pdfPath);

    // Load existing PDF
    const pdfDoc = await PDFDocument.load(existingPDF);

    console.log("************************************");
    const form = pdfDoc.getForm();

    /*
    - You can set value using index as well
    const fieldNames = form.getFields().map(field => field.getName());
    form.getCheckBox(fieldNames[16]).check();
    */

    /*
    //To find checkbox name
    for (const field of form.getFields()) {
        if (field.constructor.name === 'PDFCheckBox') {
            const radio = form.getCheckBox(field.getName());
            console.log(field.getName());
        } else {
            // console.log(field.getName(), field.constructor.name);
        }
    }
    */

    /*Use this to find Radio button options
        for (const field of form.getFields()) {
        if (field.constructor.name === 'PDFRadioGroup') {
            const radio = form.getRadioGroup(field.getName());
            console.log(field.getName(), radio.getOptions());
        } else {
            console.log(field.getName(), field.constructor.name);
        }
        }
    */


    /*
    Requirement - Get PDF form fields?
    "option-1" get all keys and save in txt file

    const fieldNames = form.getFields().map(field => field.getName());
    console.log(fieldNames);
    fs.writeFileSync(outputPath1, fieldNames.join('\n'));
    ===============
    "option-2" get all keys and types then save in json file
    const fields = form.getFields().map(field => ({
        name: field.getName(),
        type: field.constructor.name,
    }));

    console.table(fields);
    fs.writeFileSync(
        path.join(process.cwd(), 'tests', 'testData/pdfData', 'pdf-fields.json'),
        JSON.stringify(fields, null, 2),
    );
    */



    //Section 1-Applicant Details
    form.getTextField('2 Name of insured').setText('Rahul Kumar');
    form.getTextField('1 Date').setText('10/10/90');
    form.getTextField('1 Policy number').setText('24F700600123');
    form.getTextField('OFFICE USE XS AD').setText('Y');
    form.getTextField('2 Real estate agent').setText('Test agent');
    form.getTextField('2 Postal address').setText('Hilife Nature 560067');
    form.getTextField('2 Postcode').setText('3003');
    form.getTextField('2 Email address').setText('test@gmail.com');

    //Are you registered for GST purposes?
    form.getCheckBox('Registered for GST?').check(); //No

    //Have you claimed or do you intend to claim an input tax credit on the GST applicable to this policy?
    form.getCheckBox('Claim credit?').check();//No






    // Section 2.Damage report
    form.getTextField('Premises postcode').setText('3001');






    // Save modified PDF
    const modifiedPDF = await pdfDoc.save();
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, modifiedPDF);


});