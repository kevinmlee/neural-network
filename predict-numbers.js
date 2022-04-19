const brain = require("brain.js");
const axios = require("axios");
const dayjs = require("dayjs");

const dateNow = dayjs().unix();
const dateAfter = dayjs(
  new Date().setFullYear(new Date().getFullYear() - 1)
).unix();

const coinGeckoURL =
  "https://api.coingecko.com/api/v3/coins/terra-luna/market_chart/range?vs_currency=usd&from=" +
  dateAfter +
  "&to=" +
  dateNow;

const normalize = (x) => x / 10;
const denormalize = (x) => x * 10;

axios.get(coinGeckoURL, {}).then(
  (response) => {
    const data = response.data.prices;
    let seedData = [];

    // output data to console so we can see the dates and prices that we are working with
    for (const day of data)
      console.log(dayjs(day[0]).format("DD/MM/YYYY"), day[1]);

    for (const price of data) seedData.push(price[1]);

    trainAndPredict(seedData);
  },
  (error) => console.log(error)
);

trainAndPredict = (seedData) => {
  const config = {
    iterations: 5000,
    learningRate: 0.005,
    errorThresh: 0.02,
    //log: true,
  };

  const net1 = new brain.recurrent.RNNTimeStep();
  const net2 = new brain.recurrent.LSTMTimeStep();
  const net3 = new brain.recurrent.GRUTimeStep();

  const normalisedTrainingData = seedData.map(normalize);
  //console.log("Input array", normalisedTrainingData);

  console.log("\n - Training started. Please wait.\n");
  net1.train([normalisedTrainingData], config);
  net2.train([normalisedTrainingData], config);
  net3.train([normalisedTrainingData], config);
  console.log("\n - Training complete\n");

  const output1 = net1.forecast(normalisedTrainingData, 10);
  const output2 = net2.forecast(normalisedTrainingData, 10);
  const output3 = net3.forecast(normalisedTrainingData, 10);

  const outputRun1 = net1.run(normalisedTrainingData);
  const outputRun2 = net2.run(normalisedTrainingData);
  const outputRun3 = net3.run(normalisedTrainingData);

  console.log("1) Forecast: ", output1.map(denormalize));
  console.log("2) Forecast: ", output2.map(denormalize));
  console.log("3) Forecast: ", output3.map(denormalize));

  console.log("1) Run: ", outputRun1 * 10);
  console.log("2) Run: ", outputRun2 * 10);
  console.log("3) Run: ", outputRun3 * 10);
};
