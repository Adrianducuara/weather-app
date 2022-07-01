'use strict';

export async function getDataWeather(city) {
    const KEY = '35a47105380041ae8f312741220107';
    const URL = `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}}&lang=es`;
    try {
        const dataWeatherApi = await fetch(URL);
        const dataWeatherApiJson = await dataWeatherApi.json();
        return dataWeatherApiJson;
    }catch(error) {
        console.log(error);
    }
}