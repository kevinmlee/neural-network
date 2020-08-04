const brain = require("brain.js");
const data = require("./twitter.json");
const prompt = require("prompt");

const network = new brain.recurrent.LSTM();

const trainingData = data.map((item) => ({
  input: item.text,
  output: item.category,
}));

prompt.start();

train = (data) => {
  console.log("\n - Training started\n");
  network.train(data, {
    iterations: 100,
    log: true,
  });
  console.log("\n - Training complete\n");
};

execute = (input) => {
  console.log("----------------------------------");
  console.log(`Running against input:`);
  console.log("----------------------------------");
  console.log(`"${input}"`);

  let results = network.run(input);

  console.log("\n----------------------------------");
  console.log(`Best guess:`);
  console.log("----------------------------------");
  console.log(`${results}\n\n`);
};

// checks if the trainingData has the input
checkForInput = (input) => {
  console.log(trainingData.some((item) => item.text === input));
};

// train
train(trainingData);

function waitForUserInput() {
  console.log("\n----------------------------------");
  console.log(`Enter a sentence to run against training data.`);
  console.log("If you're done and want to exit, enter 'exit'.");
  console.log("----------------------------------");

  prompt.get(["input"], function (err, result) {
    if (err) {
      console.log(err);
      return 1;
    }

    if (result.input !== "exit") {
      console.log("Command-line input received. \n\n");
      execute(result.input);
      waitForUserInput();
    }
  });
}

waitForUserInput();

/*
execute(
  "We are in very close communication with China concerning the virus. Very few cases reported in USA, but strongly on watch. We have offered China and President Xi any help that is necessary. Our experts are extraordinary!"
);
*/
