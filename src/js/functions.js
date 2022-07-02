'use strict';
export function rederizationInfoWeather(elem, {country, name, region}, {condition: {icon, text}, feelslike_c, humidity, temp_c}) {
    return elem.innerHTML =                    `
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
}
export function messageAlert(message, element) {
    const containerError = document.createElement('div');
    const phrase = document.createElement('p');
    phrase.textContent = message;
    containerError.appendChild(phrase);
    containerError.classList.add('error');
    containerError.style.display = "block";
    if(!document.querySelector('.error')) {
        element.appendChild(containerError);
    }

    setTimeout(() => {
        containerError.remove();
    }, 3000);
}
