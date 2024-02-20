import { MONGODB_URI } from '$env/static/private';
import { MongoClient } from 'mongodb';

let client = null;

export async function connect() {
  if (!client) {
    console.log(`Connecting to MongoDB...`);
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log(`Connected to MongoDB`);
  }
}

export async function disconnect() {
  console.log(`Disconnecting from MongoDB...`);
  await client.close();
}

export async function getClient() {
  if (!client) await connect();
  return client;
}

export function getDatabase() {
  if (!client) getClient();
  return client.db();
}

export const connectles = getDatabase().collection('connectles');
