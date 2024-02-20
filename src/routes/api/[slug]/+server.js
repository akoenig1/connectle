export async function GET({ url }) {
  const slug = url.pathname.replace(/^\/api\//, '');
  // const ref = doc(database, "connections", slug).withConverter(dataConverter);
  // const document = await getDoc(ref);
  // const data = document.data();
  console.log(slug);
  const data = {
    title: "Test Game",
    categories: [
      {
        title: "Category 1",
        level: 0,
        items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      },
      {
        title: "Category 2",
        level: 1,
        items: ["Item A", "Item B", "Item C", "Item D"],
      },
      {
        title: "Category 3",
        level: 2,
        items: ["Item I", "Item II", "Item III", "Item IV"],
      },
      {
        title: "Category 4",
        level: 3,
        items: ["One", "Two", "Three", "Four"],
      },
    ],
    timeCreated: new Date(),
  }

  if (data) {
    return new Response(JSON.stringify({ result: data, error: "" }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ result: null, error: "Error." }), { status: 500 });
  }
}
