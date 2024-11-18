"use server";
import { connectToDB } from "@/models";
import ContractTemplate from "@/models/ContractTemplate";

export async function destroy(templateId: string) {
  await connectToDB();
  await ContractTemplate.findByIdAndDelete(templateId);
}
