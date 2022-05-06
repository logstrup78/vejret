const express = require("express");
const https = require("https");
const config = require("./config");
const app = express();
const bodyParser = require("body-parser");
const req = require("express/lib/request");

app.use(bodyParser.urlencoded({ extended: true }));

/*GET funktion. */
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const api = config.keys;
  const city = req.body.city;
  const query =
    "https://api.openweathermap.org/data/2.5/weather?appid=" +
    api +
    "&lang=da&q=" +
    city +
    "&units=metric";

  https.get(query, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = Math.round(weatherData.main.temp);
      const feels = Math.round(weatherData.main.feels_like);
      const weatherDescription = weatherData.weather[0].description;

      res.write('<head><meta charset="utf-8"></head>');
      res.write("<h1>Vejret er således i " + city + "</h1>");
      res.write(
        "<h2>Temperaturen er " +
          temp +
          " grader, men føles som " +
          feels +
          " grader.</h2>"
      );
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
