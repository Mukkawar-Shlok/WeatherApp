// require Express, path, node-fetch
const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
require('dotenv').config();

// Create app
const app = express();

// Create port
const port = 4000;

// Start listening at port
app.listen(port, () => {
    console.log(`listening on port ${port}. . .`);
});

// Use application type json upto 2MB size
app.use(express.json({ limit: "2mb" }));

// Serve static project of index.js in ./public folder
app.use(express.static(path.join(__dirname, "./public")));

// Server end-point
//asynchronous function
app.get("/weather/:loc", async (req, res) => {
    // Get location entered by user
    const loc = req.params["loc"];

    // Create url PS: There was error in using string literals if in future u resolve it then plz update it
    const uri =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        loc +
        "&appid=" + process.env.API_KEY;

    try {
        // Await till it fetches url
        const fetch_res = await fetch(uri);

        // Await till it converts it to json
        const json = await fetch_res.json();

        // Debug
        // console.log(`City: ${loc} Temperature: ${JSON.stringify(json['main']['temp'])-273.15}`)

        // Creating JSON object which will be sent to client
        const json_object = {
            city: json["name"],
            temp: Math.round(JSON.stringify(json["main"]["temp"]) - 273.15),
            coord: json.coord,
        };
        // Debug
        console.log(json_object);

        // Send JSON object to client
        res.json(json_object);
    } catch (e) {
        const json_object = {
            city: "NA",
            temp: "NA",
            coord: "NA",
        };
        // Debug
        console.log(json_object);

        // Send JSON object to client
        res.json(json_object);
    }
});
