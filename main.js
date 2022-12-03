const key = 'b8ae4086537537bfb0757ebc4e44cb89';
const url = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;
const temp = document.querySelector('.temperature');
const searchText = document.querySelector('.input-txt');
const submit = document.querySelector('.submit-btn');
const loc = document.querySelector('.location');
const changeTemperatureUnit = document.querySelector('.temp-class');
const presentTemperatureUnit = document.querySelector('.temp-unit');
const temperatureDescription = document.querySelector('.temperature-description');
const imgIcon = document.querySelector('.icon-img');
let place;


async function getWeatherByLocation(location){
    const resp = await fetch(url(location), {
        origin: 'cors'
    });
    const respData = await resp.json();
    console.log(respData);
    imgIcon.src = `http://openweathermap.org/img/w/${respData.weather[0].icon}.png`;
    temp.textContent = kelvinToCelsius(respData.main.temp);
    temperatureDescription.textContent =  respData.weather[0].description;
}
getWeatherByLocation('mysore');

function kelvinToCelsius(kelvin){
    return (kelvin- 273.15).toFixed(1);
}
function CelsiusTokelvin(celcius){
    return (celcius + 273.15).toFixed(1);
}

submit.addEventListener('click', function(){
    if(searchText.value == ""){
        alert('Invalid input')
    }
    else{
        place = searchText.value;
        console.log(place);
        getWeatherByLocation(place);
        loc.textContent = place;
        searchText.value = "";
    }
})

changeTemperatureUnit.addEventListener('click', function(){
    if (presentTemperatureUnit.textContent == 'C'){
        temp.textContent = CelsiusTokelvin(Number(temp.textContent)); 
        presentTemperatureUnit.textContent = 'F';
    }
    else{
        temp.textContent = kelvinToCelsius(Number(temp.textContent));
        presentTemperatureUnit.textContent = 'C';
    }
    
})

