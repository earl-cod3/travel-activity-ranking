import { ActivityScorer } from '../activityScorer';
import { ActivityScore } from '../activity';
import { DailyForecast } from '../weather';

export class IndoorSightseeingScorer implements ActivityScorer {
  score(forecast: DailyForecast[]): ActivityScore {
    if (forecast.length === 0) {
      return {
        activity: 'INDOOR_SIGHTSEEING',
        score: 0,
        reasoning: 'No forecast data available.',
      };
    }

    const badWeatherDays = forecast.filter(
      (d) => d.precipitation > 5 || d.temperatureMax < 10
    ).length;

    const score = Math.round(
      (badWeatherDays / forecast.length) * 100
    );

    return {
      activity: 'INDOOR_SIGHTSEEING',
      score,
      reasoning:
        'Indoor activities are more appealing during cold or rainy days.',
    };
  }
}
