import { DailyForecast } from '../domain/weather';

interface OpenMeteoResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    windspeed_10m_max: number[];
  };
}

export class WeatherService {
  async get7DayForecast(city: string): Promise<DailyForecast[]> {
    // Step 1: Convert city → coordinates
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`City "${city}" not found`);
    }

    const { latitude, longitude } = geoData.results[0];

    // Step 2: Fetch forecast
    const forecastUrl =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max` +
      `&forecast_days=7` +
      `&timezone=auto`;

    const forecastResponse = await fetch(forecastUrl);
    const forecastData: OpenMeteoResponse = await forecastResponse.json();

    return this.mapToDailyForecast(forecastData);
  }

  private mapToDailyForecast(data: OpenMeteoResponse): DailyForecast[] {
    const { daily } = data;

    return daily.time.map((date, index) => ({
      date,
      temperatureMax: daily.temperature_2m_max[index],
      temperatureMin: daily.temperature_2m_min[index],
      precipitation: daily.precipitation_sum[index],
      windSpeed: daily.windspeed_10m_max[index],
    }));
  }
}
