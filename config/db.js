import { MongoClient } from "mongodb";
const url = process.env.DB_URL;
const client = new MongoClient(url);

let database;

export async function db() {
  if (!database) {
    await client.connect();
    console.log("MongoDB connected");
    database = client.db("myProject");
  }
  return database;
}
