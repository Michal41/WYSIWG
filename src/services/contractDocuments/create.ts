"use server";
import { connectToDB } from "@/models";
import ContractDocument from "@/models/ContractDocument";
import { IContractDocument } from "@/models/ContractDocument";

interface CreateContractDocumentData {
  document: string;
  contractId: string;
}

export async function create(data: CreateContractDocumentData) {
  await connectToDB();
  const contractDocument: IContractDocument = new ContractDocument({
    contractId: data.contractId,
    content: JSON.parse(data.document),
  });
  await contractDocument.save(JSON.parse(data.document));
  return "Contract document created successfully";
}
