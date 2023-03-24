import app from '../app.js';
import supertest from 'supertest';
const request = supertest(app);

describe('POST /weather/:cityName', () => {
  describe('given a city name', () => {
    it('should respond with a 200 status code', async () => {
      const response = await request.post('/weather/london');
      expect(response.statusCode).toBe(200);
    });

    it('should specify json in the content type header', async () => {
      const response = await request.post('/weather/london');
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });

    it('should respond with a 404 status code if city name is undefined', async () => {
      const response = await request.post(
        '/weather/gibberishCityNameIsHerejar;bnarjb'
      );
      expect(response.statusCode).toBe(404);
    });

    it('should respond with a 400 status code if there is no city name', async () => {
      const response = await request.post('/weather/');
      expect(response.statusCode).toBe(405);
    });
  });
});
