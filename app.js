
const express = require("express");
const https = require ("https");
const app = express();


/*GET funktion. */
app.get("/", function(req,res){

    const query =
      "https://api.openweathermap.org/data/2.5/weather?appid=XXXXXXXXXXXXXX&lang=da&q=copenhagen&units=metric";

https.get(query, function (response) {
      console.log(response.statusCode);

      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const feels = weatherData.main.feels_like;
        const weatherDescription = weatherData.weather[0].description;

        console.log(temp);
      });
    });

/*Herunder er hvad der vises i browseren*/
    
    res.send("App is up and running")
});



app.listen(3000, function(){
    console.log("Server is running on port 3000")
});

