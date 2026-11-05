# Playwright_workspace

Basics and AI capability

#Install - npm init playwright@latest
#Running the Example Test - $npx playwright test
Report -
npx playwright show-report

Notes - all browsers will place here
-C:\Users\pc\AppData\Local\ms-playwright

#Run

- Run Simple .ts file - $ node .\test1.ts

- Run Through test Runner cmd , Test runner window will open
  $npx playwright test --ui

- Debug using CodeGen tool Given by playwright ,
  - You can inspect locator at Run time
  - No need extra plugin
  - $npx playwright test 02LocatorSmart.spec.ts --debug

- Record and playback using Codegen
  - npx playwright codegen https://rahulshettyacademy.com/angularpractice/

- Run only only one browser
  - npx playwright test 02LocatorSmart.spec.ts --debug --project=chromium

- IQ- How can you run test case on different config file
  - $npx playwright test 02LocatorSmart.spec.ts --config playwright.config_1.ts
  - Benefits examples-
  - Suppose you want to execute particular project with some setting
  - Project-1 on headless/firefox and project-2 on chrome
  - Run on QA /UAT-1/ UAT-2

- IQ - How to run test case on iphone 18 / Andriod /
  - do setting on config file
  - check browserName : webkit
    ...devices['iphone 18']

- Handle SSL certification?
  - ignoreHTTPSErrors:true
    -Set permission like location permissions:['geolocation'],

- IQ- How to record video for failed test/1st retry?
- video: 'on-first-retry/retain-on-failure',

- Check reort directly Refrash each time- http://localhost:9323/

- Add screenshot in config.ts file
  browserName: 'chromium',
  headless: false,
  screenshot: 'on',
  trace:'on' -for all pass/fail
  trace:'retain-on-failure' - to save memory and faster execution

- CSS selector
  - . for class ex- .test-clas
  - # for id ex- #dom-id

# How to debug the API steps in script using Visual code debugging

- Using --debug cmds mode -> only UI scripts can be debug
- Question - How to debug API scripts?
- Goto "package.json"
  "scripts": {
  "test": "npx playwright test tests/03RahulAPI/02Web_Api_utils.spec.ts --headed"
  },
- From search VS code - "Shift+ Ctrl +p" -> select -> debug: debug npm Script
- timeout: 180 \* 1000, //Keep 3 minutes use for API calls in config.ts file

#. Detailed view of Trace viewer to understand the "API" logging req/responses

- this is beautiful feature to check logs for API -Very good to trace logs
- Set in config.ts
  trace: 'on'
- Run API test case from terminal -$npx playwright test 02Web_Api_utils.spec.ts
- and check test-results folder -> trace.zip
- open this URL and upload -https://trace.playwright.dev/

Q) What are Playwright Fixtures - Understand their use cases & Steps to implement

- Build UI Login Fixture & API call Fixture for a Test - Example
- Demo of 3 Custom Fixtures -Data driven, UI & API with Setup & TearDown unit code

- Fixture is reuseable unit of code tosetup and tearDown that PW injects to test cases
- Build-in Fixture {browser, page, context}
- Custome fixture [Create for Login functionality]
  -"Heavy lifting " should be done already and focus on actual TC
- step-1 goto Utils folder -> import test
- step-2 extend original base test & export
- Step-3 import in acutal test
- Data Driven functionality we can acchieve Using this Fixture also. (See examples)

#. Read write Excel file and Json
There are 2 library

1.  npm install xlsx
    - Using xlsx — Recommended for data processing
    - Fast parsing; lightweight; converts sheet to JSON in one line.
    - Standard choice if you want to read an .xlsx file and convert its rows directly into strongly-typed JavaScript/TypeScript objects
    - Parse to Json then read in faster ways
    - Disadvantage- take more memory

2.  npm install exceljs

- Recommended if you need cell styles or manual iteration
- To write
- is ideal if you need to read Excel structures cell-by-cell or access formulas, rich text formatting, or row numbers directly.

#- Page Object Pattern

- Create a Page object folder
- Page Object Manager class -
  - Page Object Manager (POM) class acts as a "single registry or factory" that instantiates
    and manages all your Page Object instance

# How to read Json file?

- Create a TestData.json file in testData folder
- import that file and covert [Json -> string -> Js Object]
- So parsing issue will not come if any UTF encoding data is there in file
- example codes-
- const dataSet = JSON.parse(JSON.stringify(require("../testData/JsonTestData.json"))); //not working
- import dataSet from "../testData/JsonTestData.json"; //Working for me

# How to parametrize Json test data file?

- Check test_ClientAppPO.spec.ts file, this will run multiple time
  for (const data of dataSet)
  test(`Execute test for multiple set of data ${data.productName}`, async () => {

        console.log(data.email);
        console.log(data.password);
        console.log(data.productName);

  })

# How to pass test data as fixture by extend test annotation behaviour

- "Not much use ful"
- Create a .ts File
- create a custom test and extend it from {base} fixture
- export it - check this file -> test-base-Fixture.ts // test data will be here
- import it and call from test file -test_testBaseFixture.spec.ts

# AI with Playwright

- MCP git - all tools are avaliable
- write simple english and LLM will execute using tools
- https://github.com/microsoft/playwright-mcp
- Configuration -

============================================================================

# Html & Allure Reporting -

## Playwright HTML Report

### 1. What is the HTML Report?

Playwright provides a built-in HTML reporter that generates a detailed and interactive test execution report.

Using the HTML report, we can easily analyze:

- Total number of tests executed.
- Passed, failed, skipped, and flaky test cases.
- Test execution duration.
- Error details and failure information.
- Individual test execution results.

### 2. Configure HTML Reporter

By default, Playwright supports the HTML reporter.

To configure it explicitly:

1. Open the `playwright.config.ts` file.
2. Locate the `defineConfig` section.
3. Add the `reporter: 'html'` property.

**Configuration:**

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: "html",
});
```

### 3. Where Can We Find the HTML Report?

After test execution, Playwright generates the HTML report inside the `playwright-report` folder.

**Report Location:**

```text
Project Folder
    |
    └── playwright-report
            |
            └── index.html
```

Open `index.html` in a browser to view the detailed test execution report.

### 4. How to Open the HTML Report?

Execute the following command in the terminal:

```bash
npx playwright show-report
```

This command opens the Playwright HTML report in your default browser.

**Note:** The HTML report is generated after test execution. The `playwright-report` folder contains the report files, and `index.html` is the main entry point.

````



## Allure Reporting

Allure is a reporting tool that generates interactive and detailed Playwright test execution reports.

**Reference:** https://www.npmjs.com/package/allure-playwright

### 1. Install Allure Packages

```bash
npm install -D allure-playwright
npm install --save-dev allure-commandline  (to add on cmds line)
````

Q)
Difference between npm install and npm install --save-dev
Command Purpose package.json
npm install package-name Installs a regular dependency dependencies
npm install --save-dev package-name Installs a development dependency devDependencies

In simple words

- dependencies → Packages required to run the application.
- devDependencies → Packages required during development, testing, and reporting.

**Verify installation:** Check the `devDependencies` section in `package.json`.

### 2. Execute Test Cases and Generate Allure Results

Run the following command to execute tests with the Allure reporter:

```bash
npx playwright test --grep "@web" --reporter=line,allure-playwright
```

This generates the `allure-results` folder inside the project workspace.

### 3. Generate Allure HTML Report

```bash
npx allure generate ./allure-results --clean -o ./allure-report
```

This generates the `allure-report` folder containing the HTML report.

### 4. Open Allure Report

```bash
npx allure open ./allure-report
```

This starts a local web server and opens the Allure report in your browser.

**Generated Folders:**

- `allure-results` – Contains raw test execution results.
- `allure-report` – Contains the generated HTML report.

=====================================================================================

# Now, How to create custom scripts in package.json to trigger test

````

## Playwright Test Execution Using NPM Scripts-

### 1. What is NPM Scripts?

The `package.json` file acts as an entry point for executing Playwright test cases using custom scripts.

We can create custom scripts for different test execution requirements, such as Smoke, Regression, Web, and API testing.

### 2. Configure Custom Scripts

Open `package.json` and define the following scripts inside the `scripts` section:

```json
"scripts": {
  "test": "npx playwright test tests/03RahulAPI/02Web_Api_utils.spec.ts --headed",
  "regression": "npx playwright test",
  "webtest": "npx playwright test --grep @web",
  "apitest": "npx playwright test --grep @Api"
}
```

### 3. Execute Tests Using NPM Scripts

Run the following commands in the terminal:

| Script | Execution Command | Purpose |
|---|---|---|
| Test | `npm run test` | Executes a specific test file in headed mode |
| Regression | `npm run regression` | Executes all test cases |
| Web Test | `npm run webtest` | Executes tests tagged with `@web` |
| API Test | `npm run apitest` | Executes tests tagged with `@Api` |

```

**Benefits:**
- Simplifies test execution.
- Avoids writing lengthy Playwright commands repeatedly.
- Allows separate scripts for Web, API, Smoke, and Regression testing.
- Makes test execution easier for team members.

````
