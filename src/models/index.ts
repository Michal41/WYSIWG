import mongoose from "mongoose";
import { ServerApiVersion } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI

if (!MONGO_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

export const connectToDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};