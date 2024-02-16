const invalidTransactions = require("./invalidTransactions");

// Sample/basic unit test
test("1. Ability to flag invalid transactions based on: 1. dollar amount", () => {
  expect(
    invalidTransactions([
      "John,1707625218560,300,Chicago",
      "John,1707625219542,310,Houston",
      "John,1707628819542,205,Houston",
      "Alice,1707625258461,195,Denver",
      "Bob,1707625259212,1250,Atlanta",
    ])
  ).toStrictEqual(["Bob,1707625259212,1250,Atlanta"]);
});

// test("2. Ability to flag invalid transactions based on: 2. timestamp", () => {
//   expect(
//     invalidTransactions([
//       "John,1707625218560,300,Chicago",
//       "John,1707625219542,310,Houston",
//       "John,1707628819542,205,Houston",
//       "Alice,1707625258461,195,Denver",
//       "Bob,1707625259212,1250,Atlanta",
//     ])
//   ).toStrictEqual([
//     "John,1707625218560,300,Chicago",
//     "John,1707625219542,310,Houston",
//   ]);
// });

// PLEASE PROVIDE ANY ADDITIONAL UNIT TESTS AS YOU DEEM APPROPRIATE!
// Note: You may use any Jest-compatible methods and patterns, as you wish.
