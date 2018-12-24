# tl_solutions

This is a solution to the code challenge using comprehension of flows, data analysis capacity, technical troubleshooting skills, and coding competencies.

Please follow the instructions to test the results:

- Clone the repo to your local environment.
- Part A, B and C are pdf files that can be found easily under their names.
- Part D:

    + Run `npm install` to install dependencies:
        - axios for making get request
        - fast-csv for converting csv file to json objects
        - jest for unit tests
    + To see the failed urls and tactic IDs:
        - Run `node index.js`
    + To run the tests: 
        - Run `jest --detectOpenHandles --forceExit` to test and exit the async operation
    + The status of responses falls into 3 types:
        - "ok" is 2xx, 3xx response
        - 4xx, 5xx response
        - 'ECONNRESET', 'ECONNABORTED', 'ENOTFOUND' The request was made but no response was received
