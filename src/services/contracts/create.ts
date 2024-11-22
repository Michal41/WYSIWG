"use server";
import { connectToDB } from "@/models";
import Contract from "@/models/Contract";
import { IContract } from "@/models/Contract";
import ContractDocument from "@/models/ContractDocument";
import { IContractDocument } from "@/models/ContractDocument";
interface CreateContractData {
  name: string;
  clientName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: string;
}

export async function create(data: CreateContractData) {
  await connectToDB();
  const contract: IContract = new Contract({
    name: data.name,
    clientName: data.clientName,
    metadata: { contractStartDate: "" },
  });
  await contract.save();
  const contractId = contract._id;
  const contractDocument: IContractDocument = new ContractDocument({
    contractId,
    content: JSON.parse(data.document),
  });
  await contractDocument.save(JSON.parse(data.document));
  return "Contract created successfully";
}
