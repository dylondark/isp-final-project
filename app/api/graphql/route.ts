import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { resolvers } from "../../../graphql/resolvers";
import { typeDefs } from "../../../graphql/schema";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { fetchDataAndStore } from '../../../graphql/data';
import dbConnect from '../../../middleware/db-connect';

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    await fetchDataAndStore();
    return handler(req, res);
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    await fetchDataAndStore();
    return handler(req, res);
};