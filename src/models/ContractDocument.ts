import mongoose, { Document, Schema } from "mongoose";

export interface IContractDocument extends Document {
  contractId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
}

const ContractDocumentSchema: Schema = new Schema(
  {
    contractId: { type: String, required: true },
    content: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.models.ContractDocument ||
  mongoose.model<IContractDocument>("ContractDocument", ContractDocumentSchema);
