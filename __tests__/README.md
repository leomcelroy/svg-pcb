# Tests

We keep tests in the `__tests__` directory. At the moment all code is ES6, so the tests are ES6 too. The test files should represent the same hierarchy as files in the `js` directory.

## Usage

To add new tests, create a test file in the `__tests__` directory. Follow the naming convention `original_file_name.test.js`
```
touch __tests__/pcb_helpers.test.js
```

To run tests, go to the root of the repository and run the following
```
yarn test
```

## TODO

- [ ] Add N% tests
- [ ] ...