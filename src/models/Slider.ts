import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISlider extends Document {
  title: string;
  subtitle?: string;
  imageUrl: string;
  link?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SliderSchema = new Schema<ISlider>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    imageUrl: { type: String, required: true },
    link: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Slider: Model<ISlider> = mongoose.models.Slider || mongoose.model<ISlider>("Slider", SliderSchema);
export default Slider;
