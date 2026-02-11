import { ActivityScore } from './activity';
import { DailyForecast } from './weather';

export interface ActivityScorer {
  score(forecast: DailyForecast[]): ActivityScore;
}
