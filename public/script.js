

// Функция для управления видимостью кнопки очистки
 function toggleClearButton() {
    const input = document.querySelector('.weather__input');
    const clearButton = document.querySelector('.weather__clear');
    if (input.value) {
        clearButton.classList.add('weather__clear_visible');
    } else {
        clearButton.classList.remove('weather__clear_visible');
    }
}

function clearInput() {
    const input = document.querySelector('.weather__input');
    input.value = '';
    toggleClearButton();
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.weather__input');
    const clearButton = document.querySelector('.weather__clear');
    const submitButton = document.querySelector('.weather__submit');

    input.addEventListener('input', toggleClearButton);
    clearButton.addEventListener('click', clearInput);
    submitButton.addEventListener('click', getWeather);
});

async function getWeather() {
    const input = document.querySelector('.weather__input');
    const city = input.value;
    const resultDiv = document.querySelector('.weather__result');

    if (!city) {
        resultDiv.innerHTML = 'Пожалуйста, введите город!';
        return;
    }

    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = data.error;
        } else {
            resultDiv.innerHTML = `
                <h2 class="weather__city">${data.city}</h2>
                <p class="weather__temp">Температура: ${data.temperature}°C</p>
                <p class="weather__desc">Описание: ${data.description}</p>
                <p class="weather__humidity">Влажность: ${data.humidity}%</p>
                <p class="weather__wind">Скорость ветра: ${data.windSpeed} м/с</p>
            `;
        }
        clearInput();
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = 'Ошибка подключения к серверу';
        clearInput();
    }
}
