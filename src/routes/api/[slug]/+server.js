import { getDataFromSlug } from '../../../firebase/firebase.js';

export async function GET({ url }) {
  const slug = url.pathname.replace(/^\/api\//, '');

  const data = await getDataFromSlug(slug);

  if (data) {
    return new Response(JSON.stringify({ result: data.result, error: "" }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ result: null, error: data.error }), { status: 500 });
  }
}
