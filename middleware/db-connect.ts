import mongoose from 'mongoose';
import {MongoMemoryServer} from "mongodb-memory-server";

async function dbConnect(): Promise<void> {
  const mongoServer = await MongoMemoryServer.create();
  const MONGO_URI = mongoServer.getUri();
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(MONGO_URI, {
    dbName: 'FBI',
  });
}

export default dbConnect;