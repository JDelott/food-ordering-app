import { model, models, Schema } from "mongoose";

const MenuItemsSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    basePrice: { type: Number },
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemsSchema);
