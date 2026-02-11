import { ActivityScore } from '../domain/activity';
import { DailyForecast } from '../domain/weather';
import { ActivityScorer } from '../domain/activityScorer';

import { SkiingScorer } from '../domain/scorers/skiingScorer';
import { SurfingScorer } from '../domain/scorers/surfingScorer';
import { OutdoorSightseeingScorer } from '../domain/scorers/outdoorSightseeingScorer';
import { IndoorSightseeingScorer } from '../domain/scorers/indoorSightseeingScorer';

export class RankingService {
  private readonly scorers: ActivityScorer[];

  constructor() {
    this.scorers = [
      new SkiingScorer(),
      new SurfingScorer(),
      new OutdoorSightseeingScorer(),
      new IndoorSightseeingScorer(),
    ];
  }

  rankActivities(forecast: DailyForecast[]): ActivityScore[] {
    const scores = this.scorers.map((scorer) =>
      scorer.score(forecast)
    );

    return scores.sort((a, b) => b.score - a.score);
  }
}
