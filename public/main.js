//Written by Alexa Fazio
window.onload = function() {
	getUserWardrobe();
	getWeather();
}

let fiveDayForecast = [];

//Written by Gabrielle Weiner
let wardrobeSelector = document.getElementById('dropdown');
let myWardrobe = document.querySelector('.my-wardrobe');

//Written by Alexa Fazio
let nextDaysDiv = document.getElementById('switchday');
let nextDays = Array.from(document.querySelectorAll("#switchday h3"));
document.getElementById('cdegrees').addEventListener("click", fahrenheitToCelsius);
document.getElementById('fdegrees').addEventListener("click", celsiusToFahrenheit);
document.getElementById('done-button').addEventListener("click", getRecommendedApparel);
nextDaysDiv.onclick = switchDay;

//Written by Gabrielle Weiner
wardrobeSelector.onchange = addWardrobeItem;
myWardrobe.onclick = deleteWardrobeItem;

// Written By Alexa Fazio
async function getWeather() {
	fiveDayForecast = [];

	// Source for next 3 lines: https://youtu.be/17UVejOw3zA
	const api_url = '/weather'; 
    const fetch_response = await fetch(api_url);
    json = await fetch_response.json();
   
    storeForecast(json);

    raw = 0;
    for (let i = 0; i < fiveDayForecast.length; i++) {
		fiveDayForecast[i].dayOfWeek = getDayOfWeek(fiveDayForecast, raw);
		if (raw === fiveDayForecast.length - time.getDay()) {
			raw = -time.getDay();
		}
		else {
			raw++;
		}
	}
	getDayWeather(fiveDayForecast[0]);

setTimeout(getWeather, 108000)
}

// Written By Alexa Fazio
function storeForecast(json) {
	currentDate = json.list[0].dt_txt;
	currentDate = currentDate.slice(8, 10);
	fiveDayForecast = [json.list[0]];
	for (let i = 0; i < json.list.length; i++) {
		if (json.list[i].dt_txt.slice(8, 10) !== currentDate) {
			
			fiveDayForecast.push(json.list[i]);
			currentDate = json.list[i].dt_txt.slice(8, 10);
		}
	}
	return fiveDayForecast;
}
// Written By Alexa Fazio
function getDayOfWeek(fiveDayForecast, raw) {
	time = new Date(); // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
	currentDayOfWeek = time.getDay() + raw;

	switch (currentDayOfWeek) {
        case 0:
            currentDayOfWeek = "Sun"
            break;
        case 1:
            currentDayOfWeek = "Mon"
            break;
        case 2:
            currentDayOfWeek = "Tues"
            break;
        case 3:
            currentDayOfWeek = "Wed"
            break;
        case 4:
            currentDayOfWeek = "Thurs"
            break;
        case 5:
            currentDayOfWeek = "Fri"
            break;
        case 6:
            currentDayOfWeek = "Sat"
            break;
    }
    return currentDayOfWeek;
}
// Written By Alexa Fazio
function getDayWeather(dayWeather) {
	icon = "http://openweathermap.org/img/wn/" + dayWeather.weather[0].icon + "@2x.png"; // Source: https://openweathermap.org/forecast5
   	condition = dayWeather.weather[0].main;
    temps = [dayWeather.main.temp_min, dayWeather.main.temp, dayWeather.main.temp_max];
    dayOfWeek = dayWeather.dayOfWeek;
    city = json.city.name;
   	kelvinToFahrenheit(temps);

    currentWeatherData = [icon, condition, temps, city, dayOfWeek];

    updateHTML(currentWeatherData);
    return currentWeatherData;
}
// Written By Alexa Fazio & Gabrielle Weiner
function switchDay(e) {
	if (e.target.tagName === "H3") {
		nextDays.forEach(function(day){
			day.className = "";
		});

		selectedDay = e.target.innerHTML;

		for (let i = 0; i < fiveDayForecast.length; i++) { 
			if (fiveDayForecast[i].dayOfWeek === selectedDay) {
				clothingList.innerHTML = "";
				getDayWeather(fiveDayForecast[i]);
			}
		}
	}
}
// Written By Alexa Fazio
function kelvinToFahrenheit(temps) {
	for (let i = 0; i < temps.length; i++) {
		temps[i] = Math.round(((temps[i] - 273.15) * 1.8) + 32);
	}
	return temps;
}
// Written By Alexa Fazio
function fahrenheitToCelsius() {
	for (let i = 0; i < temps.length; i++) {
		temps[i] = Math.round((temps[i] - 32) * (5/9));
	}
	currentWeatherData[2] = temps;
	updateHTML(currentWeatherData)
	
}
// Written By Alexa Fazio
function celsiusToFahrenheit() {
	for (let i = 0; i < temps.length; i++) {
		temps[i] = Math.round((temps[i] * 1.8) + 32);
	}
	currentWeatherData[2] = temps;
	updateHTML(currentWeatherData)
}
// Written By Alexa Fazio
function updateHTML(currentWeatherData) {
	document.getElementById('icon').src = currentWeatherData[0];
	document.getElementById('condition').innerHTML = currentWeatherData[1];
	document.getElementById('temps').innerHTML = `<h4  id="currenttemp">` + currentWeatherData[2][1] + "\xB0" + `</h4><br><h4> ` + "Low: " + currentWeatherData[2][0] + "\xB0" + '<br>' + ` </h4><h4>` + "High: " + currentWeatherData[2][2] + "\xB0" + `</h4>`;
	document.getElementById('city').innerHTML = currentWeatherData[3];
	nextDays.forEach(function(day){
		if (day.innerHTML === currentWeatherData[4]) {
			day.className = "highlighted";
		}
	});

}

function getUserWardrobe() {
	userWardrobe = Array.from(document.querySelectorAll(".my-wardrobe li"));
	userWardrobe.shift();
	return userWardrobe;
	addWardrobeItem();
	deleteWardrobeItem();
}


function addWardrobeItem() {
	// Source: https://mkyong.com/javascript/javascript-get-selected-value-from-dropdown-list/
	let clothing = wardrobeSelector.options[wardrobeSelector.selectedIndex].text; 
	let newItem = document.createElement('li');
	newItem.innerHTML = clothing;
	myWardrobe.append(newItem);
	wardrobeSelector.options[wardrobeSelector.selectedIndex].remove();
	getUserWardrobe();
}


function deleteWardrobeItem(e) {
	
		if (e.target.id !== "dropdown" && e.target.tagName === "LI") {
			for (let i = 0; i < userWardrobe.length; i++) {
				if (e.target.innerHTML == userWardrobe[i].innerHTML) {
					console.log(userWardrobe);
					let newOption = document.createElement('option');
					newOption.innerHTML = userWardrobe[i].innerHTML;
					wardrobeSelector.append(newOption);
					userWardrobe[i].remove();
					getUserWardrobe();
			}	
		}
	}
}


function getRecommendedApparel(getUserWardrobe) {
	clothingList = document.getElementById('apparel-list');

	for (var i = 0; i < userWardrobe.length; i++) {
		if (userWardrobe[i].innerHTML === "Short-Sleeve Shirt") {
			 if (currentWeatherData[2][1] < 65) {
				 userWardrobe.splice(i, 1);
				 i--;
			 }
		 } else if (userWardrobe[i].innerHTML === "Long-Sleeve Shirt") {
 			 if (currentWeatherData[2][1] > 65) {
 				 userWardrobe.splice(i, 1);
 				 i--;
 			 }
 		 } else if (userWardrobe[i].innerHTML === "Shorts") {
 			 if (currentWeatherData[2][1] < 80) {
 				 userWardrobe.splice(i, 1);
 				 i--;
 			 }
 		 } else if (userWardrobe[i].innerHTML === "Winter Jacket") {
 			 if (currentWeatherData[2][1] > 50) {
 				 userWardrobe.splice(i, 1);
 				 i--;
 			 }
 		 } else if (userWardrobe[i].innerHTML === "Raincoat") {
 			 if (currentWeatherData[1] !== "Rain") {
 				 userWardrobe.splice(i, 1);
 				 i--;
 			 }
 		 } else if (userWardrobe[i].innerHTML === "Gloves") {
 			 if (currentWeatherData[2][1] > 45) {
 				 userWardrobe.splice(i, 1);
 				 i--;
 			 }
 		 } else if (userWardrobe[i].innerHTML === "Sweatshirt") {
 			 if (currentWeatherData[2][1] > 60) {
 				 userWardrobe.splice(i, 1);
 				 i--;
 			 }
 		 } else if (userWardrobe[i].innerHTML === "Skirt") {
 			 if (currentWeatherData[2][1] < 80) {
 				 userWardrobe.splice(i, 1);
 				 i--;
 			 }
 		 } else if (userWardrobe[i].innerHTML === "Tank-Top") {
 			 if (currentWeatherData[2][1] < 80) {
 				 userWardrobe.splice(i, 1);
 				 i--;
 			 }
 		 } else if (userWardrobe[i].innerHTML === "Pants") {
 			 if (currentWeatherData[2][1] > 70) {
 				 userWardrobe.splice(i, 1);
 				 i--;
 			 }
 		 } 
	}

	userWardrobe.forEach(function(apparel){
		clothing = document.createElement("li");
		clothing.innerHTML = apparel.innerHTML;
		clothingList.append(clothing);
	});	
}
