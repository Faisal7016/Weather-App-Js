const inputbox = document.querySelector('.input-box');
const searchBtn = document.querySelector('#searchBtn');
const weather_img = document.querySelector('.weather-image');
const temp1 = document.querySelector('.temp');
const desc1 =document.querySelector('.desc');
const humidity1 = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const feels = document.getElementById('feels-like');
const city_name = document.getElementById('city-name');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');





async function checkWeather(city){
    const api_key = "4edce5e6683cbf6fda21c240129f1bf7";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data =await fetch(`${url}`).then(response => response.json());
    if(weather_data.cod === `400`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }
     weather_body.style.display = "flex";
     location_not_found.style.display = "none";
     temp1.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`
     desc1.innerHTML = `${weather_data.weather[0].description}`;
     humidity1.innerHTML =`${weather_data.main.humidity}%`
     wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`
    feels.innerHTML = `${Math.round(weather_data.main.feels_like - 273.15)}°C`
    city_name.innerHTML = `${weather_data.name}`

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "/assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "/assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "/assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "/assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "/assets/snow.png";
            break;
    }
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputbox.value);
});