import { ActivityScorer } from '../activityScorer';
import { ActivityScore } from '../activity';
import { DailyForecast } from '../weather';

export class SkiingScorer implements ActivityScorer {
  score(forecast: DailyForecast[]): ActivityScore {
    if (forecast.length === 0) {
      return {
        activity: 'SKIING',
        score: 0,
        reasoning: 'No forecast data available.',
      };
    }

    const goodDays = forecast.filter(
      (d) => d.temperatureMax <= 2 && d.precipitation > 3
    ).length;

    const score = Math.round((goodDays / forecast.length) * 100);

    return {
      activity: 'SKIING',
      score,
      reasoning:
        'Skiing performs best in cold temperatures with snowfall or precipitation.',
    };
  }
}
