import { WeatherService } from './weatherService';
import { RankingService } from './rankingService';
import { ActivityScore } from '../domain/activity';

export class ActivityRankingFacade {
  private readonly weatherService: WeatherService;
  private readonly rankingService: RankingService;

  constructor() {
    this.weatherService = new WeatherService();
    this.rankingService = new RankingService();
  }

  async rankByCity(city: string): Promise<ActivityScore[]> {
    const forecast = await this.weatherService.get7DayForecast(city);

    return this.rankingService.rankActivities(forecast);
  }
}
