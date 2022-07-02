'use strict';
import { getDataWeather, getDataWeatherLatitudeAndLongitude } from './api.js';
import { rederizationInfoWeather } from './functions.js';
import { btnSubmit, cardInfo, form, btnLocation } from './selectors.js';

export async function InfoWeatherCity({ cityValue }) {
    try {
        btnSubmit.textContent = 'Obteniendo información...'
        const fullData = await getDataWeather(cityValue);
        btnSubmit.textContent = 'Pronostico';

        const currentWeather = fullData.current;
        const currentLocation = fullData.location;

        rederizationInfoWeather(cardInfo, currentLocation, currentWeather);

    }catch(error) {
        if(error) {
            messageAlert(`No se encuentra información para ${cityValue}`, form);
        }
    }

}

export async function InfoWeatherPosition() {

    async function success(position) {

        const { latitude, longitude } = position.coords;

        try {
            //btnLocation.textContent = 'Obteniendo ubicación...';
            const fullData = await getDataWeatherLatitudeAndLongitude(latitude, longitude);
            const currentWeather = fullData.current;
            const currentLocation = fullData.location;
            rederizationInfoWeather(cardInfo, currentLocation, currentWeather);
            //btnLocation.textContent = 'Mi ubicación actual';

        }catch(error) {
            if(error) {
                messageAlert(`Lo sentimos, la posición no etá disponible`, form);
            }
        }
    }

    function error() {
        console.log('Lo sentimos, la posición no etá disponible');
    }
    const options = {
        enableHighAccuracy: false,
        maximumAge: 30000,
        timeout: 27000
    }

    await navigator.geolocation.getCurrentPosition(success, error, options);

}
