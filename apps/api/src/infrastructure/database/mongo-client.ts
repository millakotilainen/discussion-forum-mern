import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error("MONGO_URI environment variable is not set");
}

const client = new MongoClient(uri);

let db: Db;

async function connectToDatabase(): Promise<Db> {
    if (!db) {
        await client.connect();
        db = client.db();
    }
    return db;
}

async function closeDatabaseConnection() {
    await client.close();
}

export { connectToDatabase, closeDatabaseConnection };