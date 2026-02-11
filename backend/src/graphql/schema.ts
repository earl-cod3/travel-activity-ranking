import { gql } from 'apollo-server';

export const typeDefs = gql`
  type ActivityRanking {
    activity: String!
    score: Int!
    reasoning: String!
  }

  type Query {
    rankActivities(city: String!): [ActivityRanking!]!
  }
`;
