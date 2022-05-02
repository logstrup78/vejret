
const express = require("express");
const https = require ("https");
const app = express();


/*GET funktion. */
app.get("/", function(req,res){

    const query =
      "https://api.openweathermap.org/data/2.5/weather?appid=99fcd1599ec1c9c403961abde484fd86&lang=da&q=copenhagen&units=metric";

https.get(query, function (response) {
      console.log(response.statusCode);

      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const feels = weatherData.main.feels_like;
        const weatherDescription = weatherData.weather[0].description;

        res.write('<head><meta charset="utf-8"></head>');
        res.write('<h1>Vejret er således</h1>');
        res.write('<h2>Temperaturen er ' + temp + ' grader,men føles som ' + feels + ' grader</h2>')
      });
    });

/*Herunder er hvad der vises i browseren*/
    
    // res.send("app is up and running");
});



app.listen(3000, function(){
    console.log("Server is running on port 3000")
});

