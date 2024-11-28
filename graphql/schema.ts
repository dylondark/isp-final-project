import { gql } from 'graphql-tag';

export const typeDefs = gql`

    type Fbi {
        url: String!
        subjects: [String!]!
        title: String!
        description: String!
        age_range: String!
        sex: String!
        hair: String!
        weight: String!
        image: String!
    }

    input FbiInput {
        url: String!
        subjects: [String!]!
        title: String!
        description: String!
        age_range: String!
        sex: String!
        hair: String!
        weight: String!
        image: String!
    }

    type Query {
        Fbi(title: String!): Fbi
    }

    type Mutation {
        Fbi(data: FbiInput): Fbi
    }
`;