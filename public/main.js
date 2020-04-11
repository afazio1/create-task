
document.getElementById('weather-button').addEventListener("click", getWeather)

async function getWeather() {
    
    const api_url = '/weather';
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
   
    //console.log(json);
    var icon = '';
    var condition = json.weather[0].main;
    let temps = [json.main.temp_min, json.main.temp, json.main.temp_max];
    console.log(typeof temps[0]);
    var city = json.name;

    kelvinToFahreinheit(temps);
    

    document.getElementById('weather').innerHTML = json.weather[0].main;
}

function kelvinToFahreinheit(temps) {
	for (let i = 0; i < temps.length; i++) {
		console.log(typeof temps[i]);
		temps[i] = Math.round(((temps[i]-273.15)*1.8)+32);
	}
	return temps;
}