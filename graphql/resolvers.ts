import FBIModel from '../mongoose/fbi/model';

export const resolvers = {
  Query: {
    Fbis: async () => {
      try {
        const data = await FBIModel.find({});
        return data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    Fbi: async (_: any, { title }: { title: string }) => {
      try {
        const data = await FBIModel.findOne({ title });
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
};
