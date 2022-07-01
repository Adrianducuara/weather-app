'use strict';

export function messageAlert(message) {
    const containerError = document.createElement('div');
    const phrase = document.createElement('p');
    phrase.textContent = message;
    containerError.appendChild(phrase);
    containerError.classList.add('error');
    containerError.style.display = "block";

    form.appendChild(containerError);

    setTimeout(() => {
        containerError.remove();
    }, 3000);
}
