import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  if (typeof cityName === 'undefined') {
    res.status(400);
    res.send('Enter a city name, please');
  }
  res.status(200);
  res.send(cityName);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
