/**********************************************************************************************************************
 * Columbia Insurance Group Take-home Coding Assessment - Invalid Transactions
 *
 * Thank you for your interest in working with us, and for taking the time to complete this coding assessment! As with
 * most development, there are many possible solutions to this problem (many not "right" or "wrong"), and there may be
 * ambiguities on our part, too. So, we are not necessarily looking for the perfect or most-efficient solution; but
 * rather, deeper insights into your problem-solving approach and coding-style. Because of that, please avoid
 * researching and mimicking ways that other people have solved this type of problem. We are most interested in YOUR
 * own unique solution and style! If you perceive any ambiguities or questions, please feel free to make comments in
 * your work acknowledging them so we can take that into account, and just try your best to work around those.
 *
 * In addition, there is a corresponding unit-test file accompanying this file. In that is a basic sample test that
 * you may run to check your work. While we don't expect you to provide any extra unit tests, please feel free to do
 * so, if your style is TDD. There are no npm scripts provided, so just run: `jest invalidTransactions.test.js`
 *
 * For this assessment, please create your own Node.js project on your local machine and work on it there in whatever
 * IDE you like. There are no required dependencies to the project, unless you want to leverage unit-testing (in which
 * case, you'll need Jest).
 *
 * If you have a GitHub account, we would appreciate if you create a repo and push your work into that as you do it,
 * complete with commit history. When ready to complete the assessment and submit it, we can more easily review your
 * work that way. If you do not have a GitHub account, then please email us back the files you worked on, when done.
 *
 * Good luck, and we hope you can have some fun with this!
 *
 *
 * INSTRUCTIONS:
 * Given an array of transactions (where each element is a single transaction), determine which transaction(s) are
 * invalid and return them in an array (see OUTPUT below for details). A transaction is considered invalid if:
 *  - The amount exceeds $1000, or
 *  - If it occurs within (and including) 60 minutes of another transaction by the same person AND in a different city.
 *
 *
 * INPUT:
 * Each transaction in the input array that the function will process is a string consisting of comma-separated values
 * representing the name, timestamp, amount, and city of the transaction (in that order). The transactions in the array
 * will always be sorted ascending by timestamp.
 *  - Note: The time value is in epoch format (milliseconds since 1970) --e.g. like what Date.now() returns.
 *  - Example input data:
 *      [
 *          "John,1707625218560,300,Chicago",
 *          "John,1707625219542,310,Houston",
 *          "John,1707628819542,205,Houston",
 *          "Alice,1707625258461,195,Denver",
 *          "Bob,1707625259212,1250,Atlanta"
 *      ]
 *
 *
 * OUTPUT:
 * Return an array of those transactions that you deem to be invalid. Any transactions in the resulting array should
 * be in ascending order by time.
 *  - Valid return-data based on the above example input:
 *      [
 *          "John,1707625218560,300,Chicago",  <-- Invalid because within 60 minutes of the $310 Houston transaction
 *          "John,1707625219542,310,Houston",  <-- Invalid because within 60 minutes of the $300 Chicago transaction
 *          "Bob,1707625259212,1250,Atlanta"   <-- Invalid because amount is over the $1,000 threshold
 *      ]
 *  - Explanation:
 *      - Two of John's transactions are within 60 minutes of each other AND from different cities so BOTH are invalid.
 *      - Bob's transaction is over $1000 so it is invalid.
 *********************************************************************************************************************/

/**
 * Main Function -- DO YOUR WORK HERE
 * @param {string[]} transactions - Array of strings, with each string being a transaction.
 * @returns {string[]} - Array of strings, with each string being an invalid transaction.
 */
const invalidTransactions = (transactions) => {
  let invalidTxs = [];

  transactions.forEach((transactionString) => {
    const [name, timestamp, amount, city] = transactionString.split(",");
    // console.log(name, timestamp, amount, city);

    if (isOverMaxAmount(amount)) {
      invalidTxs = [...invalidTxs, transactionString];
    }
  });
  // console.log("invalidTxs >>>>>>>> ", invalidTxs);

  return invalidTxs;
};

const isOverMaxAmount = (amount) => {
  return parseInt(amount) > 1000;
};

module.exports = invalidTransactions; // Do NOT modify or remove this
