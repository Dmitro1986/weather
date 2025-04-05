const express = require('express');
const axios = require('axios');
const { apiKey, port } = require('./config');

const app = express();

// Set proper character encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

app.get('/weather', async (req, res) => {
  const city = encodeURIComponent(req.query.city);

  if (!city) {
    return res.status(400).json({ error: 'Укажите город' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;
    const response = await axios.get(url);
    const weatherData = response.data;
    console.log(weatherData);
    

    res.json({
      city: weatherData.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения данных о погоде' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
