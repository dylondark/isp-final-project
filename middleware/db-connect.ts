import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { storeDocument } from "../mongoose/fbi/services";

async function dbConnect(): Promise<any | String> {
  const mongoServer = await MongoMemoryServer.create();
  const MONGOIO_URI = mongoServer.getUri();
  await mongoose.disconnect();
  await mongoose.connect(MONGOIO_URI, {
    dbName: "FBI"
  });

  await storeDocument({
    url: "https://example.com/1",
    subjects: ["subject1", "subject2"],
    title: "Title 1",
    description: "Description 1",
    age_range: "20-30",
    sex: "Male",
    hair: "Brown",
    weight: "70kg",
    image: "https://example.com/image1.jpg"
  });
  await storeDocument({
    url: "https://example.com/2",
    subjects: ["subject3", "subject4"],
    title: "Title 2",
    description: "Description 2",
    age_range: "30-40",
    sex: "Female",
    hair: "Blonde",
    weight: "60kg",
    image: "https://example.com/image2.jpg"
  });
  await storeDocument({
    url: "https://example.com/3",
    subjects: ["subject5", "subject6"],
    title: "Title 3",
    description: "Description 3",
    age_range: "40-50",
    sex: "Male",
    hair: "Black",
    weight: "80kg",
    image: "https://example.com/image3.jpg"
  });
}



export default dbConnect;