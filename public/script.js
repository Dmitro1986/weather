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
    
    // Обработка нажатия Enter в поле ввода
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            getWeather();
        }
    });
});

async function getWeather() {
    const input = document.querySelector('.weather__input');
    const city = input.value;
    const resultDiv = document.querySelector('.weather__result');

    if (!city) {
        resultDiv.innerHTML = '<p class="weather__error"><i class="fas fa-exclamation-circle"></i> Пожалуйста, введите город!</p>';
        return;
    }

    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = `<p class="weather__error"><i class="fas fa-exclamation-circle"></i> ${data.error}</p>`;
        } else {
            const weatherIcon = getWeatherIcon(data.description.toLowerCase());
            
            resultDiv.innerHTML = `
                <h2 class="weather__city">
                    <i class="weather__result-icon ${weatherIcon}"></i>
                    ${data.city}
                </h2>
                <p class="weather__temp">
                    <i class="fas fa-temperature-high"></i>
                    Температура: ${data.temperature}°C
                </p>
                <p class="weather__feels-like">
                    <i class="fas fa-thermometer-half"></i>
                    Ощущается как: ${data.feels_like}°C
                </p>
                <p class="weather__desc">
                    <i class="fas fa-info-circle"></i>
                    Описание: ${data.description}
                </p>
                <p class="weather__pressure">
                    <i class="fas fa-compress-arrows-alt"></i>
                    Давление: ${data.pressure} гПа
                </p>
                <p class="weather__humidity">
                    <i class="fas fa-tint"></i>
                    Влажность: ${data.humidity}%
                </p>
                <p class="weather__wind">
                    <i class="fas fa-wind"></i>
                    Скорость ветра: ${data.windSpeed} м/с
                </p>
            `;
        }
        clearInput();
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = '<p class="weather__error"><i class="fas fa-exclamation-triangle"></i> Ошибка подключения к серверу</p>';
        clearInput();
    }
}

// Функция для выбора иконки погоды
function getWeatherIcon(description) {
    if (description.includes('дождь')) {
        return 'fas fa-cloud-rain';
    } else if (description.includes('облачно')) {
        return 'fas fa-cloud';
    } else if (description.includes('ясно')) {
        return 'fas fa-sun';
    } else if (description.includes('гроза')) {
        return 'fas fa-bolt';
    } else if (description.includes('снег')) {
        return 'fas fa-snowflake';
    } else if (description.includes('туман')) {
        return 'fas fa-smog';
    } else {
        return 'fas fa-cloud-sun'; // иконка по умолчанию
    }
}

// // Функция для управления видимостью кнопки очистки
//  function toggleClearButton() {
//     const input = document.querySelector('.weather__input');
//     const clearButton = document.querySelector('.weather__clear');
//     if (input.value) {
//         clearButton.classList.add('weather__clear_visible');
//     } else {
//         clearButton.classList.remove('weather__clear_visible');
//     }
// }

// function clearInput() {
//     const input = document.querySelector('.weather__input');
//     input.value = '';
//     toggleClearButton();
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const input = document.querySelector('.weather__input');
//     const clearButton = document.querySelector('.weather__clear');
//     const submitButton = document.querySelector('.weather__submit');

//     input.addEventListener('input', toggleClearButton);
//     clearButton.addEventListener('click', clearInput);
//     submitButton.addEventListener('click', getWeather);
// });

// async function getWeather() {
//     const input = document.querySelector('.weather__input');
//     const city = input.value;
//     const resultDiv = document.querySelector('.weather__result');

//     if (!city) {
//         resultDiv.innerHTML = 'Пожалуйста, введите город!';
//         return;
//     }

//     try {
//         const response = await fetch(`/weather?city=${city}`);
//         const data = await response.json();

//         if (data.error) {
//             resultDiv.innerHTML = data.error;
//         } else {
//             resultDiv.innerHTML = `
//                 <h2 class="weather__city">${data.city}</h2>
//                 <p class="weather__temp">Температура: ${data.temperature}°C</p>
//                 <p class="weather__desc">Описание: ${data.description}</p>
//                 <p class="weather__humidity">Влажность: ${data.humidity}%</p>
//                 <p class="weather__wind">Скорость ветра: ${data.windSpeed} м/с</p>
//             `;
//         }
//         clearInput();
//     } catch (error) {
//         console.error('Error:', error);
//         resultDiv.innerHTML = 'Ошибка подключения к серверу';
//         clearInput();
//     }
// }
