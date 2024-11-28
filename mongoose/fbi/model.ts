import mongoose, { model } from "mongoose";
import { FbiInterface } from "./interface";
import { FbiSchema } from "./schema";

export default mongoose.models.Fbi ||
    model<FbiInterface>("Fbi", FbiSchema);