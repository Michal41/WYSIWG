"use server";
import { connectToDB } from "@/models";
import Contract from "@/models/Contract";

export async function destroy(contractId: string) {
  await connectToDB();
  await Contract.findByIdAndDelete(contractId);
}
