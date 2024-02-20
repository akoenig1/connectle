export const load = async (event) => {
  const slug = event.params.slug;
  const data = await event.fetch(`/api/${slug}`).then(r => {
    return r.json()}
  );

  const result = data.result;

  return {
    result,
    slug
  };
}