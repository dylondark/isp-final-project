import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import axios from "axios";
import { storeDocument } from "@/mongoose/fbi/services";
import { FBIInterface } from "@/mongoose/fbi/interface";

async function fetchDataFromAPI(): Promise<FBIInterface[]> {
    try {
        const response = await axios.get('https://api.fbi.gov/wanted/v1/list');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function dbConnect(): Promise<void> {
    try {
        // Setup MongoDB Memory Server
        const mongoServer = await MongoMemoryServer.create();
        const MONGOIO_URI = mongoServer.getUri();
        
        // Connect to database
        await mongoose.disconnect();
        await mongoose.connect(MONGOIO_URI, {
            dbName: "FBI"
        });

        // Fetch and load data
        const data = await fetchDataFromAPI();
        for (const item of data) {
            await storeDocument(item);
        }
        console.log('Data loaded successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
}

export default dbConnect;