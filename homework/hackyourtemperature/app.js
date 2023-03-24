import { API_KEY } from './sources/keys.js';
import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  res.status(405);
  res.send(
    'The HTTP method associated with the request is not supported, please enter a city name. For instance: /weather/cityName'
  );
});

app.post('/weather/:cityName', async (req, res) => {
  const cityName = req.params.cityName;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (typeof data.name === 'undefined') {
      res.status(404);
      res.send({ weatherText: 'City is not found!' });
      return;
    }

    const info = { city: data.name, temperature: `${data.main.temp} Celsius` };
    res.status(200);
    res.send(info);
  } catch (error) {
    res.status(503);
    res.send('The API server is not ready to accept requests.');
  }
});

export default app;
