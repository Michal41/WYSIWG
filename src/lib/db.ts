import { MongoClient, Db, ServerApiVersion } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

if (!dbName) {
  throw new Error("Please define the MONGODB_DB environment variable inside .env");
}

export async function connectToDB(): Promise<Db> {
  if (db) {
    return db;
  }

  if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await client.connect();
  }

  db = client.db(dbName);
  return db;
}

export async function closeDBConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}