import { addGame } from '../../firebase/firebase.js';

export async function POST({ request }) {
  const body = await request.json();
  let result = null;
  
  try {
    result = await addGame(body);
    console.log(`Document ${result.id} inserted successfully`);
  } catch (error) {
    console.log(error);
  }

  return new Response( JSON.stringify({ result: result, error: false }), { status: 200 });
}

export async function PUT({ request }) {
  console.log(request);
  return new Response( JSON.stringify({ result: true, error: false }), { status: 200 });
}
