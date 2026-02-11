import { ActivityScorer } from '../activityScorer';
import { ActivityScore } from '../activity';
import { DailyForecast } from '../weather';

export class SurfingScorer implements ActivityScorer {
  score(forecast: DailyForecast[]): ActivityScore {
    if (forecast.length === 0) {
      return {
        activity: 'SURFING',
        score: 0,
        reasoning: 'No forecast data available.',
      };
    }

    const goodDays = forecast.filter(
      (d) => d.windSpeed > 15 && d.precipitation < 5
    ).length;

    const score = Math.round((goodDays / forecast.length) * 100);

    return {
      activity: 'SURFING',
      score,
      reasoning:
        'Surfing benefits from stronger winds and low rainfall.',
    };
  }
}
