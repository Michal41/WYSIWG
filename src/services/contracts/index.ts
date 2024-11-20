"use server";
import { connectToDB } from "@/models";
import Contract from "@/models/Contract";

export async function index() {
  await connectToDB();
  const contracts = await Contract.find({});
  return JSON.stringify(contracts);
}
