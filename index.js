const brain = require("brain.js");
const data = require("./twitter.json");

const network = new brain.recurrent.LSTM();

const trainingData = data.map(item => ({
  input: item.text,
  output: item.category
}));

train = data => {
  console.log("\n - Training started\n");
  network.train(data, {
    iterations: 100,
    log: true
  });
  console.log("\n - Training complete\n");
};

execute = input => {
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
checkForInput = input => {
  console.log(trainingData.some(item => item.text === input));
};

train(trainingData);

execute(
  "We are in very close communication with China concerning the virus. Very few cases reported in USA, but strongly on watch. We have offered China and President Xi any help that is necessary. Our experts are extraordinary!"
);
