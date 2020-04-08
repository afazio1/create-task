
document.getElementById('weather-button').addEventListener("click", getWeather)

async function getWeather() {
    
    const api_url = '/weather';
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    

    console.log(json);
    document.getElementById('weather').innerHTML = json.weather[0].main;
}
