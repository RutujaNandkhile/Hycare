import mongoose, { Schema, Document, Model } from "mongoose";

export interface IApplication extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  status: "pending" | "reviewed" | "contacted" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    service: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "reviewed", "contacted", "closed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Application: Model<IApplication> =
  mongoose.models.Application || mongoose.model<IApplication>("Application", ApplicationSchema);
export default Application;
