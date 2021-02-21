const weather = document.querySelector(".js-weather");
const pla = document.querySelector(".place")
const API_KEY = "7ae34b60df5f622367750e11dcb29d04"
const COORDS = 'coords';

function getWeather(lat, lng){
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
 .then(function(response){
  return response.json()
 }).then(function(json){
   const temperature = json.main.temp;
   const place = json.name;
   weather.innerText = ` ${temperature}℃`
   pla.innerText=`${place}`
 })
}



function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj)
  getWeather(latitude, longitude);
} 
function handleGeoError(){
  console.log('Cant access geo location')
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}


function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  } else{
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init(){
  loadCoords();

}
init();