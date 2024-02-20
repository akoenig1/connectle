import { MONGODB_URI } from '$env/static/private';
import { MongoClient } from 'mongodb';

const client = new MongoClient(MONGODB_URI);

export async function connect() {
  await client.connect();
}

export async function disconnect() {
  await client.close();
}

export function getDB() {
  return client.db();
}
