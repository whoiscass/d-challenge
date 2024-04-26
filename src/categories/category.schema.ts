import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
      }
  }, { timestamps: true });
  
  export const Category = mongoose.model("category", CategorySchema);