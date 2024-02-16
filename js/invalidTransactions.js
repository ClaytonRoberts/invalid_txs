// Submitted by Clayton Roberts

// Thank you for the opportunity to work on this code challenge.
// I had never used Jest before, so it was interesting to me to try that. Even just creating usable test data and going through to make the test output match the requirements was a pretty big task and a good learning opportunity.
// Overall, this is an interesting/fun problem.
// The author makes it seem easy with the first requirement (amount > 1000), but then the second requirement (the user / city / time check) is a big jump in complexity.
// And then making sure the output is sorted by time, and that that there are no duplicates adds another layer of complexity.

// Notes:

// 1. I'm concerned about the size of the data set possibly being too large for my nested loop and causing a timeout. But that's the approach I took.
// Normally, I'd lean on sql and return desired results via a query rather than looping through data in JS. Or I'd use a batch job of some kind if timing out is a probability.

// 2. There is some ambiguity in the instructions:
// If a customer has - say - 3 transactions within 60 minutes and the middle record having a different city. (with the top / most recent coming "1st" in array being called "1st")
// ...if 2nd record is a different city, then the 2nd and 3rd records are invalid according to instructions.
// One could argue that the 1st or a subsequent 4th entry might also need to be flagged as invalid if within the same 60 minutes.
// However, that'd add a lot of complexity, and instructions didn't explicitly call for that. So, I'm assuming that just the 2nd and 3rd records in this example I'm describing should be flagged as invalid.

// 3. I need to be careful of when to add the over-amount records to the return data. I don't want it to step on the toes of my j loop.

// 4. For test creation, I researched the MS timestamps and used a site that converts them to human-readable format. Normally I'd use Moment for this.
// I then used a spreadsheet to put together the big test data, test 2.
// I also looked up the.sort to confirm my syntax.

// I'd love to hear any feedback or critique you have. I'm always looking to improve. Thanks again for the opportunity.
// - Clayton

/**
 * Main Function -- DO YOUR WORK HERE
 * @param {string[]} transactions - Array of strings, with each string being a transaction.
 * @returns {string[]} - Array of strings, with each string being an invalid transaction.
 */
const invalidTransactions = (transactions) => {
  let invalidTxs = [];

  // addedTxIndexes array: if the j loop transaction was already added to the invalidTxs array as an i/j pair, then we don't want to add it again once the i loop is on that item which was removed as a j.
  let addedTxIndexes = [];

  // traditional for loop so I can break out easily and not waste compute power. Also, when nesting loops, the i and j loops are more reader-friendly imo.
  for (let i = 0; i < transactions.length; i++) {
    const [name, timestamp, amount, city] = transactions[i].split(",");
    const timestampInt = parseInt(timestamp);
    const amountInt = parseInt(amount);
    const oneHourInMs = 3600000;
    const maxAmount = 1000;

    let txIRemoved = false; // in-loop flag to avoid double write below for when reaching the amount check (in case the item was already flagged in the i/j loop).

    if (!addedTxIndexes.includes(i)) {
      for (let j = i + 1; j < transactions.length; j++) {
        const [name2, timestamp2, amount2, city2] = transactions[j].split(",");
        const timestampInt2 = parseInt(timestamp2);

        if (Math.abs(timestampInt2 - timestampInt) > oneHourInMs) {
          break; // no need to get into the city check if the timestamps are more than an hour apart. and break is ok (rather than continue) bc input records are in order of time.
        } else {
          if (name === name2) {
            if (Math.abs(timestampInt2 - timestampInt) <= oneHourInMs) {
              if (city !== city2) {
                invalidTxs = [...invalidTxs, transactions[i], transactions[j]];
                addedTxIndexes = [...addedTxIndexes, i, j];
                txIRemoved = true;
                break; // break logic would need to change if - as described with ambiguity above - we needed to flag a 1st and/or especially a 4th or subsequent records as invalid as well.
              }
            }
          }
        }
      }

      if (txIRemoved === false) {
        if (amountInt > maxAmount) {
          invalidTxs = [...invalidTxs, transactions[i]];
        }
      }
    }
  }

  const sortedTransactions = invalidTxs.sort((a, b) => {
    const timestampA = parseInt(a.split(",")[1]);
    const timestampB = parseInt(b.split(",")[1]);
    return timestampA - timestampB;
  });

  return sortedTransactions;
};

module.exports = invalidTransactions; // Do NOT modify or remove this
