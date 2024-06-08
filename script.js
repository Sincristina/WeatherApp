
// ICON FUNCTION
function getWeatherIcon(iconCode) {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
  
// GET DAY FUNCTION
function getDayOfTheWeek(utc) {
    const date = new Date(utc * 1000);
    const dayIndex = date.getDay();
    let day;
  
    switch (dayIndex) {
      case 0:
        day = "Duminică";
        break;
      case 1:
        day = "Luni";
        break;
      case 2:
        day = "Marți";
        break;
      case 3:
        day = "Miercuri";
        break;
      case 4:
        day = "Joi";
        break;
      case 5:
        day = "Vineri";
        break;
      case 6:
        day = "Sâmbătă";
        break;
      default:
        throw new Error("Indexul trebuie sa fie intre 0 si 6.");
    }
  
    return day;
  }



  // GET HOUR FUNCTION
  function getHour(utc) {
    const date = new Date(utc * 1000);
    let hours = date.getHours();
    if (hours < 10) {
      hours = "0" + hours;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return `${hours}:${minutes}`;
  }




// API REQUEST
const currentWeather = document.querySelector(".current-weather");

const currentWeatherEndpoint = function(city){ 
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5a30e302a3e31e7414ede3dbe162b6e9&units=metric&lang=ro`;

fetch(url).then((response) => {
    return response.json();
}).then((data) => {
       //Destructuring
       const {name, dt, main, weather, wind} = data;

    currentWeather.innerHTML = `
    <div> 
    <p class="fs-2 mb-2"> <strong>${name}</strong></p>
    <p class="fs-4"> <strong>${getDayOfTheWeek(dt)}</strong> ${getHour(dt)}</p>

    <p class="fs-1"><strong> ${Math.round(main.temp)}°C </strong>  <img src =${getWeatherIcon(weather[0].icon)} > </img> </p>
    </div>

    <div> 
    <p class="fs-5"> Real feel: <strong>${Math.round(main.feels_like)}°C </strong></p> 
    <p class="fs-5 text-capitalize"> ${weather[0].description} </p> 
    <p  class="fs-5"> Vânt: <strong>${Math.round(wind.speed * 3.6)}km/h </strong></p> 
    </div>
    `

    currentWeather.style.display = "flex";
    currentWeather.style.justifyContent= "center";
    currentWeather.style.gap = "230px"
})
};
currentWeatherEndpoint("Bucharest");



// Alege-ți locația & Vremea curentă 
let cities = document.querySelectorAll(".dropdown-item");
let cityChange = document.querySelector(".cityChange");

///
for(let i = 0; i < cities.length; i++){
 let citiesValues = cities[i].textContent;

    cities[i].addEventListener("click", function(){

        if(citiesValues === "București"){
            currentWeatherEndpoint("Bucharest");
            cityChange.innerHTML = `<p>Orașul tău curent este <strong> ${citiesValues}</strong>.</p>`
            weatherForecast5Days("Bucharest");


        } else if(citiesValues === "Timișoara"){
            currentWeatherEndpoint("Timisoara");
            cityChange.innerHTML = `<p>Orașul tău curent este <strong> ${citiesValues}</strong>.</p>`
            weatherForecast5Days("Timisoara");
      

        } else if(citiesValues === "Oradea"){
            currentWeatherEndpoint("Oradea");
            cityChange.innerHTML = `<p>Orașul tău curent este <strong> ${citiesValues}</strong>.</p>`
            weatherForecast5Days("Oradea");

        } else if(citiesValues === "Arad"){
          currentWeatherEndpoint("Arad");
          cityChange.innerHTML = `<p>Orașul tău curent este <strong> ${citiesValues}</strong>.</p>`
          weatherForecast5Days("Arad");

      } else {
        currentWeatherEndpoint("Sibiu");
        cityChange.innerHTML = `<p>Orașul tău curent este <strong> ${citiesValues}</strong>.</p>`
        weatherForecast5Days("Sibiu");
      }
    });
}


// Prognoză pe 5 zile

let weatherForecastContainer = document.querySelector(".weather-forecast");

const weatherForecast5Days = function(city){ 
weatherForecastContainer.innerHTML = "";
const urlForcast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=5a30e302a3e31e7414ede3dbe162b6e9&lang=ro&units=metric`;

  fetch(urlForcast)
    .then((response) => response.json())
    .then((data) => {
      const { list } = data;

      const daysMap = {};

      list.forEach((elem) => {
        const { dt } = elem;
        const day = getDayOfTheWeek(dt);
        if (daysMap[day]) {
          daysMap[day].push(elem);
        } else {
          daysMap[day] = [elem];
        }
      });

      for (key in daysMap) {
        weatherForecastContainer.innerHTML += `<h3 class="text-primary">${key}</h3>`;
        let days = daysMap[key];
        days.forEach((element) => {
          const { dt, main, weather } = element;
          const hour = getHour(dt);
          const temperature = Math.round(main.temp);
          const realFeel = Math.round(main.feels_like);
          const weatherDescription = weather[0].description;
          const weatherIcon = getWeatherIcon(weather[0].icon);

          weatherForecastContainer.innerHTML += `
            <div class="weather-forecast-box w-100 d-flex justify-content-between align-items-center border rounded p-3 mb-3">
              <div>${hour}</div>
              <div><img src="${weatherIcon}" alt="" /></div>
              <div class="fs-3"><strong>${temperature}°C</strong></div>
              <div>${weatherDescription}</div>
              <div class="real-feel">Real feel: <strong>${realFeel}°C</strong></div>
            </div>
          `;
        });
      }
    })};
    weatherForecast5Days("Bucharest");


  //Button

    const button = document.querySelector(".scroll-to-top");

    button.addEventListener("click", function(){
        window.scrollTo({
          top:0,
          behavior:"smooth"
        })
    })

    window.addEventListener("scroll", function(){
        if(window.scrollY > document.body.scrollHeight / 2){
          button.style.visibility = "visible";
          return;
        } else{
          button.style.visibility = "hidden";
        }
    });
