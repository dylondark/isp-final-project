import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Fbi {
    uid: String
    title: String
    subjects: [String]
    descriptions: [Description]
    images: [Image]
    reward_text: String
    aliases: [String]
    # Add other fields as needed
  }

  type Description {
    language: String
    description: String
  }

  type Image {
    large: String
    thumb: String
  }

  type Query {
    Fbis: [Fbi]
    Fbi(title: String!): Fbi
  }
`;