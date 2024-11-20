"use server";
import { connectToDB } from "@/models";
import Contract from "@/models/Contract";
import ContractDocument from "@/models/ContractDocument";

export async function fetchWithLatestDocument(contractId: string) {
  await connectToDB();
  const contract = await Contract.findById(contractId);
  const latestDocument = await ContractDocument.findOne({
    contractId: contractId,
  }).sort({ createdAt: -1 });
  return JSON.stringify({ contract, latestDocument });
}
