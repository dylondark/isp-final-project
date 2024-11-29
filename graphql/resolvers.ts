import { fetchData } from './data';

export const resolvers = {
  Query: {
    Fbis: async () => {
      try {
        const data = await fetchData();
        return data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    Fbi: async (_: any, { title }: { title: string }) => {
      try {
        const data = await fetchData();
        return data.find((item) => item.title === title);
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
};
