import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { resolvers } from "../../../graphql/resolvers";
import { typeDefs } from "../../../graphql/schema";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    return handler(req, res);
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    return handler(req, res);
};