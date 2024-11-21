"use server";
import { connectToDB } from "@/models";
import ContractTemplate from "@/models/ContractTemplate";

export async function show(templateId: string) {
  console.log(process.env.NODE_ENV, "process.env.NODE_ENV");
  console.log(process.env.MONGODB_URI, "process.env.MONGODB_URI");
  await connectToDB();
  const template = await ContractTemplate.findById(templateId);
  return JSON.stringify(template);
}
