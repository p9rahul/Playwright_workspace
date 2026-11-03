# Playwright_workspace

Basics and AI capability

#Install - npm init playwright@latest
#Running the Example Test - $npx playwright test
Report -
npx playwright show-report

Notes - all browsers will place here
-C:\Users\pc\AppData\Local\ms-playwright

#Run

- Run test1 file - $ node .\test1.ts

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

- Add screenshot in config.ts file
  browserName: 'chromium',
  headless: false,
  screenshot: 'on',
  trace:'on' -for all pass/fail
  trace:'retain-on-failure' - to save memory and faster execution

- CSS selector
  - . for class ex- .test-clas
  - # for id ex- #dom-id

66. How to debug the API steps in script using Visual code debugging

- Using --debug cmds mode -> only UI scripts can be debug
- Question - How to debug API scripts?
- Goto "package.json"
  "scripts": {
  "test": "npx playwright test tests/03RahulAPI/02Web_Api_utils.spec.ts --headed"
  },
- From search VS code - "Shift+ Ctrl +p" -> select -> debug: debug npm Script
- timeout: 180 \* 1000, //Keep 3 minutes use for API calls in config.ts file

67. Detailed view of Trace viewer to understand the "API" logging req/responses

- this is beautiful feature to check logs for API -Very good to trace logs
- Set in config.ts
  trace: 'on'
- Run API test case from terminal -$npx playwright test 02Web_Api_utils.spec.ts
- and check test-results folder -> trace.zip
- open this URL and upload -https://trace.playwright.dev/

74. What are Playwright Fixtures - Understand their use cases & Steps to implement
75. Build UI Login Fixture & API call Fixture for a Test - Example
76. Demo of 3 Custom Fixtures -Data driven, UI & API with Setup & TearDown unit code

- Fixture is reuseable unit of code tosetup and tearDown that PW injects to test cases
- Build-in Fixture {browser, page, context}
- Custome fixture [Create for Login functionality]
  -"Heavy lifting " should be done already and focus on actual TC
- step-1 goto Utils folder -> import test
- step-2 extend original base test & export
- Step-3 import in acutal test
- Data Driven functionality we can acchieve Using this Fixture also. (See examples)

82. Read write Excel file and Json

- npm install xlsx
