"use server";
import { Metadata } from "@/components/BlockEditor/BlockEditor";
import { connectToDB } from "@/models";
import Contract from "@/models/Contract";
import ContractDocument from "@/models/ContractDocument";
import { IContractDocument } from "@/models/ContractDocument";

interface CreateContractDocumentData {
  document: string;
  contractId: string;
  metaData: Metadata;
}

export async function create(data: CreateContractDocumentData) {
  await connectToDB();
  const contractDocument: IContractDocument = new ContractDocument({
    contractId: data.contractId,
    content: JSON.parse(data.document),
  });
  await contractDocument.save(JSON.parse(data.document));
  const contract = await Contract.findById(data.contractId);
  if (contract) {
    await Contract.findByIdAndUpdate(data.contractId, {
      $set: {
        metadata: {
          ...(contract?.metadata || {}),
          ...data.metaData,
        },
      },
    });
  }
  return "Contract document created successfully";
}
