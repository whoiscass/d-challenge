import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
      }
  }, { timestamps: true });
  
  export const Topic = mongoose.model("topic", TopicSchema);