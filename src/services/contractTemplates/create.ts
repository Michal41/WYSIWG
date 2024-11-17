"use server";
import { connectToDB } from "@/models";
import ContractTemplate from "@/models/ContractTemplate";

export async function createTemplate() {
  await connectToDB();
  const template = new ContractTemplate({
    name: "Sample Template",
    description: "This is a sample contract template.",
    content: { key: "value" },
    tags: ["sample", "template"],
  });
  await template.save();
  return template;
}
