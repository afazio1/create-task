// Remember we can not call the API (or click the button) more than 59 times per minute
// If we need to figure out styling, just put some fake data in the HTML.

window.onload = function() {
	getUserWardrobe();
}
// Cached Elements

let wardrobeSelector = document.getElementById('dropdown');
let myWardrobe = document.querySelector('.my-wardrobe');
//let removeItem = document.querySelector('li');

//Event Listeners

document.getElementById('weather-button').addEventListener("click", getWeather);
wardrobeSelector.onchange = addWardrobeItem;
myWardrobe.onclick = deleteWardrobeItem;



async function getWeather() {

    const api_url = '/weather';
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();

    console.log(json);
    console.log(json.list[0].main.temp);

    let icon = "http://openweathermap.org/img/wn/" + json.list[0].weather[0].icon + "@2x.png";;
    let condition = json.list[0].weather[0].main;
    let temps = [json.list[0].main.temp_min, json.list[0].main.temp, json.list[0].main.temp_max];
    let city = json.city.name;

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
	userWardrobe.shift();
	console.log(userWardrobe);
}

// Everything below this is code for the recommended apparel section //

function addWardrobeItem() {
	let clothing = wardrobeSelector.options[wardrobeSelector.selectedIndex].text;
	let newItem = document.createElement('li');
	newItem.innerHTML = clothing;
	myWardrobe.append(newItem);
	wardrobeSelector.options[wardrobeSelector.selectedIndex].remove();
	getUserWardrobe();

}

function deleteWardrobeItem(e) {
	console.log(e.target.tagName);
	if (e.target.id !== "dropdown" && e.target.tagName === "LI") {
		let newOption = document.createElement('option');
		newOption.innerHTML = e.target.innerHTML;
		wardrobeSelector.append(newOption);
		e.target.remove();
		getUserWardrobe();
	}
}

function getRecommendedApparel() {

}
