import { connectles } from '../../db/mongo.js';

export async function POST({ request }) {
  const body = await request.json();
  let result = null;
  
  try {
    result = await connectles.insertOne(body);
    console.log(`Document ${result.insertedId} inserted successfully`);
  } catch (error) {
    console.log(error);
  }

  return new Response( JSON.stringify({ result: result, error: false }), { status: 200 });
}

export async function PUT({ request }) {
  console.log(request);
  return new Response( JSON.stringify({ result: true, error: false }), { status: 200 });
}
