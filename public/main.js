// Remember we can not call the API (or click the button) more than 59 times per minute
// If you need to figure out styling, just put some fake data in the HTML.


document.getElementById('weather-button').addEventListener("click", getWeather);


async function getWeather() {

    const api_url = '/weather';
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();

    let icon = "http://openweathermap.org/img/wn/" + json.weather[0].icon + "@2x.png";;
    let condition = json.weather[0].main;
    let temps = [json.main.temp_min, json.main.temp, json.main.temp_max];
    let city = json.name;

   kelvinToFahreinheit(temps);
  //kelvinToCelsius(temps);


    let currentWeatherData = [icon, condition, temps, city];

    updateHTML(currentWeatherData);

}

function kelvinToFahreinheit(temps) {
	for (let i = 0; i < temps.length; i++) {
		temps[i] = Math.round(((temps[i] - 273.15) * 1.8) + 32);
	}
	return temps;
}

function kelvinToCelsius(temps) {
	for (let i = 0; i < temps.length; i++) {
		temps[i] = Math.round(temps[i] - 273.15);
	}
	return temps;
}

function updateHTML(currentWeatherData) {
	document.getElementById('icon').src = currentWeatherData[0];
	document.getElementById('condition').innerHTML = currentWeatherData[1];
	document.getElementById('temps').innerHTML = `<h3  id="currenttemp">` + currentWeatherData[2][1] + "\xB0" + `</h3><br><h3> ` + "Low: " + currentWeatherData[2][0] + "\xB0" + '<br>' + ` </h3><h3>` + "High: " + currentWeatherData[2][2] + "\xB0" + `</h3>`;
	document.getElementById('city').innerHTML = currentWeatherData[3];

}
console.log(temps);
