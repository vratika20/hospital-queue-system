import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["PATIENT", "ADMIN"],
      default: "PATIENT",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
