import { ActivityScorer } from '../activityScorer';
import { ActivityScore } from '../activity';
import { DailyForecast } from '../weather';

export class OutdoorSightseeingScorer implements ActivityScorer {
  score(forecast: DailyForecast[]): ActivityScore {
    if (forecast.length === 0) {
      return {
        activity: 'OUTDOOR_SIGHTSEEING',
        score: 0,
        reasoning: 'No forecast data available.',
      };
    }

    const goodDays = forecast.filter(
      (d) =>
        d.temperatureMax >= 15 &&
        d.temperatureMax <= 28 &&
        d.precipitation < 3
    ).length;

    const score = Math.round(
      (goodDays / forecast.length) * 100
    );

    return {
      activity: 'OUTDOOR_SIGHTSEEING',
      score,
      reasoning:
        'Outdoor sightseeing is ideal in mild temperatures with little rain.',
    };
  }
}
