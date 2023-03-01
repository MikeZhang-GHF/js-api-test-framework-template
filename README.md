## This is a JavaScript API Test Framework Template

### This template includes:
- Structure of test framework
- The steps of setup of the test framework and how to run the test suites.
- The code and pattern to do the API test as your reference in your project.
- CI GitHub actions pipline.

1. Test Framework
  - Supertest: HTTP request
  - Mocha: test suite execution and mangament
  - Chai: test assertion, BDD style - expect, should, TDD style - assert
  - Mochawsome/Allure: test result report

2. We use public API https://gorest.co.in/public/v2 for our demo. You can go to this website to register and get your own token for your test. The token in this demo might be expired, you can generate your own and do your own API testing.

3. Setup and run test suite
  - Install NodeJS [NodeJS](https://nodejs.org/en/).
  - Clone the repo.
  - Use IDE, example, VsCode to open the project.
  - Open terminal to install the libaries and dependencies, run the command, **npm install --save-dev**.
  - Run test suite, run the command, **npm test**.

4. Checkout the test result report and you can add more test cases.
   
5. CI GitHub actions pipeline.
