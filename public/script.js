// Функция для управления видимостью кнопки очистки
function toggleClearButton() {
    const cityInput = document.getElementById('cityInput');
    const clearButton = document.getElementById('clearButton');
    if (cityInput.value) {
        clearButton.classList.add('visible');
    } else {
        clearButton.classList.remove('visible');
    }
}

// Функция очистки поля ввода
function clearInput() {
    const cityInput = document.getElementById('cityInput');
    cityInput.value = '';
    toggleClearButton();
}

// Добавляем обработчики событий при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const clearButton = document.getElementById('clearButton');

    // Показывать/скрывать кнопку очистки при вводе
    cityInput.addEventListener('input', toggleClearButton);
    
    // Очищать поле при клике на кнопку
    clearButton.addEventListener('click', clearInput);
});

async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value;
    const resultDiv = document.getElementById('weatherResult');
  
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
          <h2>${data.city}</h2>
          <p>Температура: ${data.temperature}°C</p>
          <p>Описание: ${data.description}</p>
          <p>Влажность: ${data.humidity}%</p>
          <p>Скорость ветра: ${data.windSpeed} м/с</p>
        `;
      }
      clearInput(); // Используем функцию очистки
    } catch (error) {
      console.error('Error:', error);
      resultDiv.innerHTML = 'Ошибка подключения к серверу';
      clearInput(); // Используем функцию очистки
    }
}
