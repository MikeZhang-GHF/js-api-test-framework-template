/***
 *  This template shows how to use Mocha to group the test cases.
 *      - Smoke test suite, group of test cases for smoke test
 *      - Regression test suite, group of test cases for regression test
 * 
 *  After the organizing the different group of test suites, you can run
 *  different group of tests, such as smoke test. These are the steps:
 *      1. Open package.json, under "scripts",
 *      2. Write your own commands:
 *        examples, 
 *        - "smoke_test": "mocha --grep Smoke", for running your smoke tests, 
 *          if you want to ignore case, use the /i flag
 *        - "smoke_test": "mocha --grep \"/Smoke/i\"", \" is for " in the "",
 *        - "regression_test": "mocha --grep ", for running your smoke tests,
 *        - "multi_groups": "mocha --grep \"Smoke|Regression\""
 *     3. Use npm run to your own commands
 *        - npm run smoke_test
 *        - npm run regression_test
 *        - npm run multi_groups
 *   
 */


// Template I: Smoke tests for different modules
describe('Smoke Tests', () => {
    // Smoke tests for user experience api suite
    describe('user experience api', () => {
        it('should pass user experience test 1', () => {
        // Test implementation here
        });
    
        it('should pass user experience test 2', () => {
        // Test implementation here
        });        
    });

    // Smoke tests for user loyalty api suite
    describe('user loyalty api', () => {
        it('should pass user loyalty test 1', () => {
        // Test implementation here
        });
    
        it('should pass user loyalty test 2', () => {
        // Test implementation here
        });        
    });
});

  // Template II: group test cases
describe('Smoke tests', () => {
    describe('Homepage tests', () => {
        // smoke test cases for the homepage
        it('should pass Homepage test 1', () => {
        // Test implementation here
        });
    
        it('should pass Homepage test 2', () => {
        // Test implementation here
        });    
    });

    describe('Login tests', () => {
        // smoke test cases for the login functionality
        it('should pass Login test 1', () => {
        // Test implementation here
        });
    
        it('should pass Login test 2', () => {
        // Test implementation here
        });  
    });
});
  
describe('Connectivity tests', () => {
    describe('Endpoints connectivity', () => {
        // connectivity test cases for the endpoints
        it('should pass Endpoints test 1', () => {
        // Test implementation here
        });
    
        it('should pass Endpoints test 2', () => {
        // Test implementation here
        }); 
    });

    describe('Database tests', () => {
        // connectivity test cases for the database
        it('should pass database test 1', () => {
            // Test implementation here
        });
    });
});
  
describe('Regression tests', () => {
    describe('Homepage tests', () => {
        // regression test cases for the homepage
        it('should pass Homepage test 1', () => {
        // Test implementation here
        });
    
        it('should pass Homepage test 2', () => {
        // Test implementation here
        }); 
    });

    describe('Login tests', () => {
        // regression test cases for the login functionality
        it('should pass Login test 1', () => {
        // Test implementation here
        });
    
        it('should pass Login test 2', () => {
        // Test implementation here
        });  
    });
});