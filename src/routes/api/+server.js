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

  return new Response( JSON.stringify({ result: result.id, error: false }), { status: 200 });
}

// export async function PUT({ request, url }) {
//   console.log(request);
//   console.log(url);

//   const slug = url.searchParams.get('slug');
//   console.log(slug)
//   const body = await request.json();
//   let result = null;
  
//   try {
//     result = await updateGame(slug, body);
//     console.log(`Document ${result.id} inserted successfully`);
//   } catch (error) {
//     console.log(error);
//   }

//   return new Response( JSON.stringify({ result: true, error: false }), { status: 200 });
// }
