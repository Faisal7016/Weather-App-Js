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
const container = document.querySelector('.container');
// const url = 'https://yahoo-weather5.p.rapidapi.com/weather?location=qatar&format=json&u=f';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '1c93f6cd65mshab63d49437afad3p1ff74ejsn8c39985b2280',
// 		'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
// 	}
// };
// async function checkWeather(){
//     const weather_data =await fetch(url,options).then(response => response.json());
//      console.log(weather_data);
// }

// checkWeather();
 async function checkWeather(city){
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd7af6bf00cmsh79a3328e27a5c76p106aa4jsn5dda1f1311b9',
            'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
        }
    };
   const weather_data =await fetch(url,options).then(response => response.json());

   if(weather_data.message === `Internal Server Error`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }
     weather_body.style.display = "flex";
     location_not_found.style.display = "none";
     temp1.innerHTML = `${Math.round((weather_data.current_observation.condition.temperature - 32)*5/9)}°C`
     desc1.innerHTML = `${weather_data.current_observation.condition.text}`;
     humidity1.innerHTML =`${weather_data.current_observation.atmosphere.humidity}%`
     wind_speed.innerHTML = `${weather_data.current_observation.wind.speed}Km/H`
    feels.innerHTML = `${Math.round((weather_data.current_observation.wind.chill - 32)*5/9)}°C`
    city_name.innerHTML = `${weather_data.location.city}`

    switch(weather_data.current_observation.condition.text){
        case 'Thunderstorms':
            weather_img.src = "/assets/thuderstorm.png";
            container.className = "container5";
            break;
        case 'Cloudy':
            weather_img.src = "/assets/cloudy.png";
            container.className = "container2";
            break;
        case 'Rain':
            weather_img.src = "/assets/rain.png";
            container.className = "container6";
            break;
        case 'Showers':
            weather_img.src = "/assets/shower.png";
            container.className = "container6";
            break;
        case 'Sunny':
            weather_img.src = "/assets/sunny.png";
            container.className = "container7";
            break;
        case 'Haze':
            weather_img.src = "/assets/haze.png";
            container.className = "container4";
            break;
        case 'Partly Cloudy':
            weather_img.src = "/assets/mostly-cloudy.png";
            container.className = "container3";
            break;
        case 'Mostly Cloudy':
            weather_img.src = "/assets/mostly-cloudy.png";
            container.className = "container3";
            break;
        case 'Clear':
            weather_img.src = "/assets/sunny.png";
            container.className = "container7";
            break;
    }
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputbox.value);
});
