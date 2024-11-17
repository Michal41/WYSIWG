"use server";
import { connectToDB } from "@/lib/db";

export async function createTemplate() {
  const db = await connectToDB();
  await db.command({ ping: 1 });


  console.log("createTemplate");
  return "Hello, World!";
}
