export async function onRequestPost(context) {
  context.env.db.exec(context.env.db.prepare('INSERT INTO `dye-colors-search` (color,more,ip) VALUES(?,?,?)').bind(color,more,ip));
  /*context.request.formData()
  .then((formData)=>{
      var color = formData.get('color');
      var more = formData.get('more');
      var ip = context.request.headers.get('CF-Connecting-IP');
      //context.env.db.exec(context.env.db.prepare('INSERT INTO `dye-colors-search` (color,more,ip) VALUES(?,?,?)').bind(color,more,ip));
  });*/
}