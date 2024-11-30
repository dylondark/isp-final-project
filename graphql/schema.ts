import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Fbi {
    uid: String
    title: String
    subjects: [String]
    description: String
    age_min: Int
    age_max: Int
    sex: String
    hair_raw: String
    weight: String
    images: [Image]
    reward_text: String
    aliases: [String]
    url: String
    caution: String
  }

  type Image {
    original: String
    large: String
    thumb: String
  }

  type Query {
    Fbis: [Fbi]
    Fbi(title: String!): Fbi
  }
`;
