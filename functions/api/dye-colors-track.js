export async function onRequestPost(context) {
  const formData = await context.request.formData();
  var color = formData.get('color');
  var more = formData.get('more');
  var ip = context.request.headers.get('CF-Connecting-IP');
  await context.env.db.prepare('INSERT INTO `dye-colors-search` (color,more,ip) VALUES(?,?,?)').bind(color,more,ip).run();
  return new Response("Hello, world!");
}