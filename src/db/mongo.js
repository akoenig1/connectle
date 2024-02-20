import { MONGODB_URI } from '$env/static/private';
import { MongoClient } from 'mongodb';

const client = new MongoClient(MONGODB_URI);

export async function connect() {
  console.log(`Connecting to MongoDB...`);
  await client.connect();
}

export async function disconnect() {
  console.log(`Disconnecting from MongoDB...`);
  await client.close();
}

export function getDatabase() {
  return client.db();
}

export const connectles = getDatabase().collection('connectles');
