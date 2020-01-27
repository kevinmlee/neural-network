const brain = require("brain.js");
const data = require("./twitter.json");

const network = new brain.recurrent.LSTM();

const trainingData = data.map(item => ({
  input: item.text,
  output: item.category
}));

train = data => {
  console.log("Starting training...");
  network.train(data, {
    iterations: 50,
    log: true
  });
  console.log("Finished training...");
};

execute = input => {
  console.log(`Testing: "${input}"`);
  let results = network.run(input);
  console.log(`Best guess: ${results}`);
};

train(trainingData);

execute(
  "We are in very close communication with China concerning the virus. Very few cases reported in USA, but strongly on watch. We have offered China and President Xi any help that is necessary. Our experts are extraordinary!"
);
//execute('the code has some bugs');
