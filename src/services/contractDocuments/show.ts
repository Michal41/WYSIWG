"use server";
import { connectToDB } from "@/models";
import ContractDocument from "@/models/ContractDocument";

export async function show(contractDocumentId: string) {
  await connectToDB();
  const contractDocument = await ContractDocument.findById(contractDocumentId);
  return JSON.stringify(contractDocument);
}
