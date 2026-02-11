import { ActivityRankingFacade } from '../services/activityRankingFacade';
import { ActivityScore } from '../domain/activity';

const facade = new ActivityRankingFacade();

interface RankActivitiesArgs {
  city: string;
}

export const resolvers = {
  Query: {
    rankActivities: async (
      _: unknown,
      args: RankActivitiesArgs
    ): Promise<ActivityScore[]> => {
      try {
        return await facade.rankByCity(args.city);
      } catch (error) {
        console.error('Ranking failed:', error);
        throw new Error('Unable to rank activities for the given city.');
      }
    },
  },
};
