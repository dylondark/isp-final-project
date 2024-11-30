import { Schema } from 'mongoose';
import { FbiInterface } from "./interface";

export const FbiSchema = new Schema({
  uid: String,
  title: String,
  subjects: [String],
  description: String,
  age_min: Number,
  age_max: Number,
  sex: String,
  hair_raw: String,
  weight: String,
  images: [
    {
      original: String,
      large: String,
      thumb: String,
    },
  ],
  reward_text: String,
  aliases: [String],
  url: String,
  caution: String,
  details: String,
  // Add other fields as needed
});
