'use strict';
import { messageAlert } from './functions.js';
import { getDataWeather } from './api.js';

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    const cityInput = document.getElementById('city');
    //const countryInput = document.getElementById('country');
    const form = document.getElementById('form');
    const btn = document.getElementById('btn-form')
    const cardInfo = document.getElementById('card-info');

    const weather = {}

    form.addEventListener('submit', dataValidation)

    function dataValidation(e) {
        e.preventDefault();
        weather.cityValue = cityInput.value;
        //weather.countryValue = countryInput.value;
        
        const valueWeather = Object.values(weather);

        const validationValue = valueWeather.some(data => data === '');
        
        if(validationValue) {
            messageAlert('Todos los campos son obligatorios', form);
        } else {
            renderInfoWeather(weather);
        }
    }

    async function renderInfoWeather({ cityValue }) {
        try {
            btn.textContent = 'Obteniendo información...'
            const fullData = await getDataWeather(cityValue);
            btn.textContent = 'Pronostico';
            console.log(fullData);
            const currentWeather = fullData.current;
            const currentLocation = fullData.location;

            const { country, name, region } = currentLocation;
            const {condition:{icon, text},feelslike_c, humidity, temp_c} = currentWeather;

            cardInfo.innerHTML =                    `
                    <figure class="container-img">
                        <img src="${icon}" alt="${text}">
                    </figure>
                <div class="temperature-info">
                    <h3 class="grade">${Math.ceil(temp_c)}°C</h3>
                    <h4 class="action">${text}</h4>
                    <h4 class="position"><i class="fa-solid fa-location-dot"></i> ${name} - ${region}, ${country}</h4>
                </div>
                <div class="footer-card">
                    <div class="item-footer">
                        <h4 class="action"><i class="fa-solid fa-temperature-three-quarters"></i> ${Math.ceil(feelslike_c)}°C</h4>
                        <h4>Se siente</h4>
                    </div>
                    <div class="item-footer">
                        <h4 class="action"><i class="fa-solid fa-droplet"></i> ${humidity}%</h4>
                        <h4>Humedad</h4>
                    </div>
                </div>

                `;
        }catch(error) {
            if(error) {
                messageAlert(`No se encuentra información para ${cityValue}`, form);
            }
        }

    }

}

