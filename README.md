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

# Test retry , Serial & Parallel Execution & Tagging Test

- Retry -

* Go to config file
* retries:2, in -> defineConfig

- Report - Test case will execute 3 times -![alt text](image.png)
