'use strict';
const KEY = '35a47105380041ae8f312741220107';

export async function getDataWeather(city) {
    const URL = `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}&lang=es`;
    try {
        const dataWeatherApi = await fetch(URL);
        const dataWeatherApiJson = await dataWeatherApi.json();
        return dataWeatherApiJson;
    }catch(error) {
        console.log(error);
    }
}

export async function getDataWeatherLatitudeAndLongitude(lat, log) {
    const URL = `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${lat},${log}&lang=es`;
    try {
        const dataWeatherApi = await fetch(URL);
        const dataWeatherApiJson = await dataWeatherApi.json();
        return dataWeatherApiJson;
    }catch(error) {
        console.log(error);
    }
}