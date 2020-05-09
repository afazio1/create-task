//Written by Alexa Fazio

const express = require('express'); // Source: https://www.npmjs.com/package/express
const fetch = require('node-fetch'); // Source: https://www.npmjs.com/package/node-fetch

require('dotenv').config(); // Source: https://www.npmjs.com/package/dotenv

const app = express(); // Source: https://www.npmjs.com/package/express

app.get('/weather', async (req, res) => { // Source: https://www.npmjs.com/package/express
	// Source for next 2 lines: https://www.npmjs.com/package/dotenv
	var cityID = process.env.CITY_ID; 
    var key = process.env.API_KEY;
    // Sources for next 4 lines: https://www.npmjs.com/package/node-fetch & https://youtu.be/17UVejOw3zA 
    const json = await fetch_response.json();
    const api_url = 'https://api.openweathermap.org/data/2.5/forecast?id='+ cityID + '&appid=' + key; // Source: https://openweathermap.org/forecast5
    const fetch_response = await fetch(api_url); 
  	res.json(json);
});
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log("listening at port 3000"));

app.use(express.static('public')); // Source: https://www.npmjs.com/package/express