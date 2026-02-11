import { useState } from 'react';
import { fetchGraphQL } from '../../api/graphqlClient';

interface ActivityRanking {
  activity: string;
  score: number;
  reasoning: string;
}

interface RankActivitiesResponse {
  rankActivities: ActivityRanking[];
}

export function useActivityRanking() {
  const [data, setData] = useState<ActivityRanking[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function rank(city: string) {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchGraphQL<RankActivitiesResponse>(
        `
        query RankActivities($city: String!) {
          rankActivities(city: $city) {
            activity
            score
            reasoning
          }
        }
        `,
        { city }
      );

      setData(result.rankActivities);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, rank };
}
