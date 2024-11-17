"use server";
import { connectToDB } from "@/models";
import ContractTemplate from "@/models/ContractTemplate";

export async function index() {
  await connectToDB();
  const templates = await ContractTemplate.find({});
  return JSON.stringify(templates);
}
