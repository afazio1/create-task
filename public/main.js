// Remember we can not call the API (or click the button) more than 59 times per minute
// If we need to figure out styling, just put some fake data in the HTML.

window.onload = function() {
	getUserWardrobe();
}
// Variables
let fiveDayForecast = [];
// Cached Elements
let wardrobeSelector = document.getElementById('dropdown');
let myWardrobe = document.querySelector('.my-wardrobe');
let nextDays = document.getElementById('switchday');


//Event Listeners

document.getElementById('weather-button').addEventListener("click", getWeather);
document.getElementById('done-button').addEventListener("click", getRecommendedApparel);
nextDays.onclick = switchDay;
wardrobeSelector.onchange = addWardrobeItem;
myWardrobe.onclick = deleteWardrobeItem;


async function getWeather() {

    const api_url = '/weather';
    const fetch_response = await fetch(api_url);
    json = await fetch_response.json();
    console.log(json);
    
    storeForecast(json);
    // getDayOfWeek(fiveDayForecast, 0);
    
    // // by default display the current weather
    // updateHTML(currentWeatherData);
    // return currentWeatherData;
    raw = 0;
    for (let i = 0; i < fiveDayForecast.length; i++) {
		fiveDayForecast[i].dayOfWeek = getDayOfWeek(fiveDayForecast, raw)
		if (raw === time.getDay()) {
			raw = -time.getDay();
		}
		else {
			raw++;
		}
	}
	console.log(fiveDayForecast);
	getSpecifics(fiveDayForecast);
	updateHTML(currentWeatherData);
}

function storeForecast(json) {
	//store each day as one element in an array
	//this function should be called in getWeather()

	currentDate = json.list[0].dt_txt;
	currentDate = currentDate.slice(8, 10);
	fiveDayForecast = [json.list[0]];
	console.log(currentDate);
	for (let i = 0; i < json.list.length; i++) {
		if (json.list[i].dt_txt.slice(8, 10) !== currentDate) {
			//create new day
			fiveDayForecast.push(json.list[i]);
			currentDate = json.list[i].dt_txt.slice(8, 10);
		}
	}
	return fiveDayForecast;
}
function getDayOfWeek(fiveDayForecast, i) {
	time = new Date();
	currentDayOfWeek = time.getDay() + i;
	//raw = time.getDay()
	switch (currentDayOfWeek) {
        case 0:
            currentDayOfWeek = "Sunday"
            break;
        case 1:
            currentDayOfWeek = "Monday"
            break;
        case 2:
            currentDayOfWeek = "Tuesday"
            break;
        case 3:
            currentDayOfWeek = "Wednesday"
            break;
        case 4:
            currentDayOfWeek = "Thursday"
            break;
        case 5:
            currentDayOfWeek = "Friday"
            break;
        case 6:
            currentDayOfWeek = "Saturday"
            break;
    } 
    return currentDayOfWeek;
}

// might combine this function with updateHTML
function getSpecifics(fiveDayForecast) {
	icon = "http://openweathermap.org/img/wn/" + fiveDayForecast[0].weather[0].icon + "@2x.png";
   	condition = fiveDayForecast[0].weather[0].main;
    temps = [fiveDayForecast[0].main.temp_min, fiveDayForecast[0].main.temp, fiveDayForecast[0].main.temp_max];
    city = json.city.name;


   	kelvinToFahreinheit(temps);
  	// kelvinToCelsius(temps);

    currentWeatherData = [icon, condition, temps, city];
    return currentWeatherData;
}
function switchDay(e) {
	if (e.target.tagName === "H3") {
		selectedDay = e.target.innerHTML.toUpperCase();
		// now loop through fiveDayForecast, find the correct day, and display it
		
	}
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
	document.getElementById('temps').innerHTML = `<h4  id="currenttemp">` + currentWeatherData[2][1] + "\xB0" + `</h4><br><h4> ` + "Low: " + currentWeatherData[2][0] + "\xB0" + '<br>' + ` </h4><h4>` + "High: " + currentWeatherData[2][2] + "\xB0" + `</h4>`;
	document.getElementById('city').innerHTML = currentWeatherData[3];

}
function getUserWardrobe() {
	userWardrobe = Array.from(document.querySelectorAll(".my-wardrobe li"));
	userWardrobe.shift();
	console.log(userWardrobe);
	return userWardrobe;
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


function getRecommendedApparel(getUserWardrobe) {
	console.log(currentWeatherData);
	clothingList = document.getElementById('apparel-list');
// then delete the items based on their relevance to the weather
	for (var i = 0; i < userWardrobe.length; i++) {

		// clothing = document.createElement("li");
		// clothing.innerHTML = userWardrobe[i].innerHTML;
		// clothingList.append(clothing);


		if (userWardrobe[i].innerHTML === "Short-Sleeve Shirt") {
			 if (currentWeatherData[2][1] < 65) {
				 console.log(userWardrobe);
				 userWardrobe.splice(i, 1)

			 }
		}
	}

}
