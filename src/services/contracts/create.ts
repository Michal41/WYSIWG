"use server";
import { connectToDB } from "@/models";
import Contract from "@/models/Contract";

interface CreateContractData {
  name: string;
  clientName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: any;
}

export async function create(data: CreateContractData) {
  await connectToDB();
  console.log(data);
  // const contract = new Contract({ name: data.name, clientName: data.clientName });
  // await contract.save();
  return;
}
