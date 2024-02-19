export const load = async ({ params }) => {
  // const data = await getDataFromSlug(slug);
  const slug = params.slug;
  
  const result = {
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
  };

  return {
    result,
    slug
  };
}