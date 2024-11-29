import fetch from 'node-fetch';
import FBIModel from '../mongoose/fbi/model';
import dbConnect from '../middleware/db-connect';

export async function fetchDataAndStore() {
  await dbConnect();

  const response = await fetch('https://api.fbi.gov/wanted/v1/list');
  const data = await response.json();
  const items = data.items;

  try {
    // Clear existing data to avoid duplicates
    await FBIModel.deleteMany({});
    // Insert new data
    await FBIModel.insertMany(items);
    console.log('Data stored in MongoDB');
  } catch (error) {
    console.error('Error storing data in MongoDB:', error);
  }
}