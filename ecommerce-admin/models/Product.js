import { Schema, model } from "mongoose";

const modelSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
});

export const Product = model("Product", modelSchema);
