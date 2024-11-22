import mongoose, { Document, Schema } from "mongoose";

export interface IContract extends Document {
  name: string;
  clientName: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
  metadata: {
    contractStartDate?: string;
    contractEndDate?: string;
    liquefaction?: string;
  };
}

const ContractSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    clientName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    metadata: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true },
);

export default mongoose.models.Contract ||
  mongoose.model<IContract>("Contract", ContractSchema);
