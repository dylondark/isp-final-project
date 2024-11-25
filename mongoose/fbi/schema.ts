import { Schema } from "mongoose";
import { FBIInterface } from "./interface";

export const FBISchema = new Schema<FBIInterface>({
    url: {
        type: String,
        required: true,
    },
    subjects: {
        type: [String],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    age_range: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    hair: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});