import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    tokenNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["waiting", "called", "done"],
      default: "waiting",
    },
  },
  { timestamps: true }
);

export const Token = mongoose.model("Token", tokenSchema);
