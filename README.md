# Playwright_workspace

Basics and AI capability

#Install - npm init playwright@latest
#Running the Example Test - $npx playwright test
Report -
npx playwright show-report

Notes - all browsers will place here
-C:\Users\pc\AppData\Local\ms-playwright

#Run

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
