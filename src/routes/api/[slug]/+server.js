import { connectles } from '../../../db/mongo.js';
import { ObjectId } from 'mongodb';

export async function GET({ url }) {
  const slug = url.pathname.replace(/^\/api\//, '');
  let data;
  if ( slug.length < 24 ) {
    data = null;
  } else {
    const id = new ObjectId(slug);
    data = await connectles.findOne({ _id: id });
  }


  if (data) {
    return new Response(JSON.stringify({ result: data, error: "" }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ result: null, error: "Error." }), { status: 500 });
  }
}
