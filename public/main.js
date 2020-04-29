// Remember we can not call the API (or click the button) more than 59 times per minute
// If we need to figure out styling, just put some fake data in the HTML.

window.onload = function() {
	getUserWardrobe();
	getWeather();
}
// Variables
let fiveDayForecast = [];

// Cached Elements
let wardrobeSelector = document.getElementById('dropdown');
let myWardrobe = document.querySelector('.my-wardrobe');
let nextDaysDiv = document.getElementById('switchday');
let nextDays = Array.from(document.querySelectorAll("#switchday h3"));


//Event Listeners
 document.getElementById('cdegrees').addEventListener("click", kelvinToCelsius);
 document.getElementById('fdegrees').addEventListener("click", kelvinToFahrenheit);

//document.getElementById('weather-button').addEventListener("click", getWeather);
document.getElementById('done-button').addEventListener("click", getRecommendedApparel);
nextDaysDiv.onclick = switchDay;
wardrobeSelector.onchange = addWardrobeItem;
myWardrobe.onclick = deleteWardrobeItem;


async function getWeather() {
	fiveDayForecast = [];
	const api_url = '/weather';
    const fetch_response = await fetch(api_url);
    json = await fetch_response.json();
    console.log(json);

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
	console.log(fiveDayForecast);
	getDayWeather(fiveDayForecast[0]);

setTimeout(getWeather, 108000)
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
function getDayOfWeek(fiveDayForecast, raw) {
	time = new Date();
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

function getDayWeather(dayWeather) {
	icon = "http://openweathermap.org/img/wn/" + dayWeather.weather[0].icon + "@2x.png";
   	condition = dayWeather.weather[0].main;
    temps = [dayWeather.main.temp_min, dayWeather.main.temp, dayWeather.main.temp_max];
    dayOfWeek = dayWeather.dayOfWeek;
    city = json.city.name;
   	kelvinToFahrenheit(temps);
  	 //kelvinToCelsius(temps);

    currentWeatherData = [icon, condition, temps, city, dayOfWeek];

    updateHTML(currentWeatherData);
    return currentWeatherData;
}
function switchDay(e) {
	if (e.target.tagName === "H3") {
		nextDays.forEach(function(day){
			console.log(day);
			day.className = "";
		});

		selectedDay = e.target.innerHTML;
		//e.target.className = "highlighted";

		for (let i = 0; i < fiveDayForecast.length; i++) { // loop through fiveDayForecast, find the correct day, and display it
			if (fiveDayForecast[i].dayOfWeek === selectedDay) {
				clothingList.innerHTML = "";
				getDayWeather(fiveDayForecast[i]);
			}
		}
	}
}

function kelvinToFahrenheit() {
	console.log("ugh");
	for (let i = 0; i < temps.length; i++) {
		temps[i] = Math.round(((temps[i] - 273.15) * 1.8) + 32);
	}
	return temps;
}

function kelvinToCelsius() {
	console.log("hi");
	for (let i = 0; i < temps.length; i++) {
		temps[i] = Math.round(temps[i] - 273.15);
	}
	return temps;
}
//depending on what button you click it calls the necessary function

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
	console.log(userWardrobe);
	return userWardrobe;
	addWardrobeItem();
	deleteWardrobeItem();
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
		if (userWardrobe[i].innerHTML === "Short-Sleeve Shirt") {
			 if (currentWeatherData[2][1] < 65) {
				 userWardrobe.splice(i, 1);
			 }
		 }

		 if (userWardrobe[i].innerHTML === "Long-Sleeve Shirt") {
 			 if (currentWeatherData[2][1] > 65) {
 				 userWardrobe.splice(i, 1);
 			 }
 		 }

		 if (userWardrobe[i].innerHTML === "Shorts") {
 			 if (currentWeatherData[2][1] < 80) {
 				 userWardrobe.splice(i, 1);
 			 }
 		 }
 		
		 if (userWardrobe[i].innerHTML === "Winter Jacket") {
 			 if (currentWeatherData[2][1] > 50) {
 				 userWardrobe.splice(i, 1);
 				 console.log("plz work");

 			 }
 		 }

		 if (userWardrobe[i].innerHTML === "Raincoat") {
 			 if (currentWeatherData[1] !== "Rain") {
 				 userWardrobe.splice(i, 1);
 			 }
 		 }

		 if (userWardrobe[i].innerHTML === "Gloves") {
 			 if (currentWeatherData[2][1] > 45) {
 				 userWardrobe.splice(i, 1);
 			 }
 		 }

		 if (userWardrobe[i].innerHTML === "Sweatshirt") {
 			 if (currentWeatherData[2][1] > 60) {
 				 userWardrobe.splice(i, 1);
 			 }
 		 }

		 if (userWardrobe[i].innerHTML === "Skirt") {
 			 if (currentWeatherData[2][1] < 80) {
 				 userWardrobe.splice(i, 1);
 			 }
 		 }

		 if (userWardrobe[i].innerHTML === "Tank-Top") {
 			 if (currentWeatherData[2][1] < 80) {
 				 userWardrobe.splice(i, 1);
 			 }
 		 }

		 if (userWardrobe[i].innerHTML === "Pants") {
 			 if (currentWeatherData[2][1] > 70) {
 				 userWardrobe.splice(i, 1);
 			 }
 		 }
		 
	}
	
	userWardrobe.forEach(function(apparel){
		clothing = document.createElement("li");
		clothing.innerHTML = apparel.innerHTML;
		clothingList.append(clothing);
	});
		
		
}
