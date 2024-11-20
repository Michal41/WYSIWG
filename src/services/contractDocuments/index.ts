"use server";
import { connectToDB } from "@/models";
import ContractDocument from "@/models/ContractDocument";

export async function index(contractId: string) {
  await connectToDB();
  const contractDocuments = await ContractDocument.find({ contractId });
  return JSON.stringify(contractDocuments);
}
