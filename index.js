const express = require('express');
const fetch = require('node-fetch');

require('dotenv').config();

const app = express();

app.get('/weather', async (req, res) => {
	var cityID = process.env.CITY_ID;
    var key = process.env.API_KEY;
    const api_url = 'https://api.openweathermap.org/data/2.5/forecast?id='+ cityID + '&appid=' + key;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
  	res.json(json);

});
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log("listening at port 3000"));

app.use(express.static('public'));