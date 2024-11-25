import mongoose, { model } from "mongoose";
import { FBIInterface } from "./interface";
import { FBISchema } from "./schema";

export const FBIModel = model<FBIInterface>("FBI", FBISchema);