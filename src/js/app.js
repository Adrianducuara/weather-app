'use strict';
import { messageAlert } from './functions.js';
import { getDataWeather } from './api.js';

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    const cityInput = document.getElementById('city');
    const countryInput = document.getElementById('country');
    const form = document.getElementById('form');
    const btn = document.getElementById('btn-form')
    const cardInfo = document.getElementById('card-info');

    const weather = {}

    form.addEventListener('submit', dataValidation)

    function dataValidation(e) {
        e.preventDefault();
        weather.cityValue = cityInput.value;
        weather.countryValue = countryInput.value;
        
        const valueWeather = Object.values(weather);

        const validationValue = valueWeather.some(data => data === '');
        
        if(validationValue) {
            if(!document.querySelector('.error')) {
                messageAlert('Todos los campos son obligatorios');
            }
        } else {
            renderInfoWeather(weather);
        }
    }

    async function renderInfoWeather({cityValue, countryValue}) {
        try {
            btn.textContent = 'Obteniendo información...'
            const fullData = await getDataWeather(cityValue, countryValue);
            btn.textContent = 'Obtener información'

            const currentWeather = fullData.current;
            const currentLocation = fullData.location;

            const { country, name, region } = currentLocation;
            const {cloud, condition:{code, icon, text}, temp_c} = currentWeather;

            cardInfo.innerHTML = 
            `
                <figure class="container-img">
                    <img src="${icon}" alt="${text}">
                </figure>
            <div class="temperature-info">
                <h3 class="grade">${Math.ceil(temp_c)}°C</h3>
                <h4 class="action">${text}</h4>
                <h4 class="position">${name} - ${region}, ${country}</h4>
            </div>
            <div class="footer-card">
                <div class="item-footer">
                    <p>otra info</p>
                </div>
                <div class="item-footer">
                    <p>Otra info</p>
                </div>
            </div>

            `;
        } catch(error) {
            console.log(error);
        }
    }

}

