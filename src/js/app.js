'use strict';
import { InfoWeatherCity, InfoWeatherPosition } from './call-api.js';
import { messageAlert } from './functions.js';
import { cityInput, btnLocation, form } from './selectors.js';

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {

    const weather = {}

    form.addEventListener('submit', dataValidationForm)
    btnLocation.addEventListener('click', dataValidationLocation);

    function dataValidationForm(e) {
        e.preventDefault();
        weather.cityValue = cityInput.value;
        
        const valueWeather = Object.values(weather);

        const validationValue = valueWeather.some(data => data === '');
        
        if(validationValue) {
            messageAlert('Todos los campos son obligatorios', form);
        } else {
            InfoWeatherCity(weather);
        }
    }

    function dataValidationLocation() {
        InfoWeatherPosition();
    }
}

