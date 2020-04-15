// Remember we can not call the API (or click the button) more than 59 times per minute
// If we need to figure out styling, just put some fake data in the HTML.

window.onload = function() {
	getUserWardrobe();
}
// Cached Elements
let wardrobeSelector = document.getElementById('dropdown');
let myWardrobe = document.querySelector('.my-wardrobe');
let removeItem = document.querySelector('li');

//Event Listeners

document.getElementById('weather-button').addEventListener("click", getWeather);
wardrobeSelector.onchange = chooseClothes;
myWardrobe.onclick = deleteItem;



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
function getUserWardrobe() {
	var userWardrobe = Array.from(document.querySelectorAll(".my-wardrobe li"));
	console.log(userWardrobe);
	console.log(userWardrobe[0].innerHTML);
}

// Everything below this is code for the recommended apparel section //

function chooseClothes() {
	let clothing = wardrobeSelector.options[wardrobeSelector.selectedIndex].text;
	let newItem = document.createElement('li');
	newItem.innerHTML = clothing;
	myWardrobe.append(newItem);
	wardrobeSelector.options[wardrobeSelector.selectedIndex].remove();
	
}

function deleteItem(e) {
	console.log(e.target.id);
	if (e.target.id == "dropdown") {
	console.log("ok");
	}
	else {
		e.target.remove();
	}
	console.log("hu");
}
