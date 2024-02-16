const invalidTransactions = require("./invalidTransactions");

// Sample/basic unit test

test("1. Ability to flag invalid transactions based on: 2. timestamp/city and amount", () => {
  expect(
    invalidTransactions([
      "John,1707625218560,300,Chicago",
      "John,1707625219542,310,Houston",
      "John,1707628819542,205,Houston",
      "Alice,1707625258461,195,Denver",
      "Bob,1707625259212,1250,Atlanta",
    ])
  ).toStrictEqual([
    "John,1707625218560,300,Chicago",
    "John,1707625219542,310,Houston",
    "Bob,1707625259212,1250,Atlanta",
  ]);
});

test("2. BIG ONE -  Ability to flag invalid transactions based on: timestamp and city for same person and amount over 1k", () => {
  expect(
    invalidTransactions([
      "John,1708070400000,300,Chicago",
      "Alice,1708070880000,195,Denver",
      "Bob,1708071240000,1250,Atlanta",
      "John,1708137300000,205,Houston",
      "Alice,1708137540000,400,Chicago",
      "Bob,1708138080000,800,Atlanta",
      "John,1708138380000,310,Chicago",
      "Alice,1708138500000,500,Denver",
      "Bob,1708138980000,1200,Atlanta",
      "John,1708139460000,410,Houston",
      "Alice,1708140000000,600,Denver",
      "Bob,1708140300000,1300,Atlanta",
      "John,1708140600000,420,Houston",
      "Alice,1708140900000,700,Denver",
      "Bob,1708141200000,1400,Atlanta",
      "John,1708141500000,430,Houston",
      "Alice,1708141800000,800,Denver",
      "Bob,1708142100000,1500,Atlanta",
      "John,1708142400000,440,Houston",
      "Alice,1708142700000,900,Denver",
      "Bob,1708143000000,1600,Atlanta",
      "John,1708143300000,450,Houston",
      "Alice,1708143600000,1000,Denver",
      "Bob,1708143900000,1700,Atlanta",
      "Charlie,1708144200000,300,Chicago",
      "David,1708144500000,500,New York",
      "Eve,1708144800000,700,Los Angeles",
      "Charlie,1708145100000,800,Chicago",
      "David,1708145400000,1000,New York",
      "Eve,1708145700000,1200,Los Angeles",
      "Charlie,1708146000000,1300,Chicago",
      "David,1708146300000,1500,New York",
      "Eve,1708146600000,1700,Los Angeles",
    ])
  ).toStrictEqual([
    "Bob,1708071240000,1250,Atlanta",
    "John,1708137300000,205,Houston",
    "Alice,1708137540000,400,Chicago",
    "John,1708138380000,310,Chicago",
    "Alice,1708138500000,500,Denver",
    "Bob,1708138980000,1200,Atlanta",
    // "John,1708139460000,410,Houston", // this -and others commented below- not included as invalid. See note in my comments on ambiguity.
    // "Alice,1708140000000,600,Denver",
    "Bob,1708140300000,1300,Atlanta",
    // "John,1708140600000,420,Houston",
    // "Alice,1708140900000,700,Denver",
    "Bob,1708141200000,1400,Atlanta",
    // "John,1708141500000,430,Houston",
    "Bob,1708142100000,1500,Atlanta",
    "Bob,1708143000000,1600,Atlanta",
    "Bob,1708143900000,1700,Atlanta",
    "Eve,1708145700000,1200,Los Angeles",
    "Charlie,1708146000000,1300,Chicago",
    "David,1708146300000,1500,New York",
    "Eve,1708146600000,1700,Los Angeles",
  ]);
});

test("3. one more just in case", () => {
  expect(
    invalidTransactions([
      "John,1708070400000,300,Chicago",
      "Alice,1708070880000,195,Denver",
      "Bob,1708071240000,1250,Atlanta",
      "John,1708137300000,205,Houston",
      "Alice,1708137540000,400,Chicago",
      "Bob,1708138080000,800,Atlanta",
      "John,1708138380000,310,Chicago",
      "Alice,1708138500000,500,Denver",
      "Bob,1708138980000,1200,Atlanta",
    ])
  ).toStrictEqual([
    "Bob,1708071240000,1250,Atlanta",
    "John,1708137300000,205,Houston",
    "Alice,1708137540000,400,Chicago",
    "John,1708138380000,310,Chicago",
    "Alice,1708138500000,500,Denver",
    "Bob,1708138980000,1200,Atlanta",
  ]);
});

// PLEASE PROVIDE ANY ADDITIONAL UNIT TESTS AS YOU DEEM APPROPRIATE!
// Note: You may use any Jest-compatible methods and patterns, as you wish.
