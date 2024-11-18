import mongoose, { Document, Schema } from "mongoose";

export interface IContractTemplate extends Document {
  name: string;
  description?: string;
  content: object[];
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
}

const ContractTemplateSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    content: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.models.ContractTemplate ||
  mongoose.model<IContractTemplate>("ContractTemplate", ContractTemplateSchema);
