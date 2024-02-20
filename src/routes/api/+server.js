export async function POST({ request }) {
  const body = await request.json();
  console.log(body);
  const data = {
    id: body.title,
  };
  return new Response( JSON.stringify({ result: data, error: false }), { status: 200 });

}

export async function PUT({ request }) {
  console.log(request);
  return new Response( JSON.stringify({ result: true, error: false }), { status: 200 });
}
