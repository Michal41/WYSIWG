"use server";
import { connectToDB } from "@/models";
import ContractTemplate from "@/models/ContractTemplate";

export async function show(templateId: string) {
  await connectToDB();
  const template = await ContractTemplate.findById(templateId);
  return JSON.stringify(template);
}
