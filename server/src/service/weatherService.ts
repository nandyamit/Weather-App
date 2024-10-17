import axios from 'axios';

interface Coordinates {
  lat: number;
  lon: number;
}

class WeatherService {
  private static baseURL: string = 'https://api.openweathermap.org/data/2.5';
  private static apiKey: string = process.env.OPENWEATHER_API_KEY || '';

  private static async fetchLocationData(query: string): Promise<Coordinates> {
    try {
      const url = `${this.baseURL}/weather?q=${encodeURIComponent(query)}&appid=${this.apiKey}`;
      const response = await axios.get(url);
      const locationData = response.data;
      return {
        lat: locationData.coord.lat,
        lon: locationData.coord.lon
      };
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw new Error('Failed to fetch location data');
    }
  }

  public static async getWeatherForCity(cityName: string): Promise<any> {
    try {
      const coords = await this.fetchLocationData(cityName);
      const url = `${this.baseURL}/forecast?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${this.apiKey}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to fetch weather data');
    }
  }
}

export default WeatherService;