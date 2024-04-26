import { email } from "envalid";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
        type: String,
        required: true
      },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'lector', 'creador']
      }
  }, { timestamps: true });
  
  export const User = mongoose.model("user", UserSchema);