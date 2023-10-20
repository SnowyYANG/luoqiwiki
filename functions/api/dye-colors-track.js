export async function onRequestPost(context) {
  const formData = await context.request.formData();
  var type = formData.get('type');
  var color = formData.get('color');
  var more = formData.get('more');
  var ip = context.request.headers.get('CF-Connecting-IP');
  await context.env.db.prepare('INSERT INTO `dye-colors-search` (type,color,more,ip) VALUES(?,?,?,?)').bind(type,color,more,ip).run();
  return new Response('');
}