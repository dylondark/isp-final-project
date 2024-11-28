import {FbiInterface} from "../mongoose/fbi/interface";
import {db} from "./data";
import { findByTitle, updateByTitle } from "../mongoose/fbi/services";

export const resolvers = {
  Query: {
      Fbi: async (_: any, param: FbiInterface) => {
          return [db.find((item) => item.title === param.title)];
      }
  },
  Mutation: {
      Fbi: async (_: any, param: {data: FbiInterface}) => {
          return [db.find((item) => item.title === param.data.title)];
      }
  }
}