const {Weather} = require('./weather');
const {UI} = require('./UI');
const {Store} = require('./store');


const storage = new Store();
const{city,countryCode} = storage.getLocationData();
const weather = new Weather(city,countryCode);

const ui = new UI();

require('./index.css');

// funcion Obtener clima
async function fetchWeather(){
    const data = await weather.getWeather();
    ui.render(data);
}

document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;
    const countryCode = document.getElementById('countryCode').value
    weather.changeLocation(city, countryCode);
    storage.setLocationData(city, countryCode);
    fetchWeather();
    e.defaultPrevented();
});

document.addEventListener('DOMContentLoaded',fetchWeather);