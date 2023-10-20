export async function onRequestPost(context) {
  db.exec('INSERT INTO `dye-colors-search` (color,more,ip) VALUES("000",0,"127.0.0.1")');
  /*context.request.formData()
  .then((formData)=>{
      var color = formData.get('color');
      var more = formData.get('more');
      var ip = context.request.headers.get('CF-Connecting-IP');
      //db.exec(context.env.db.prepare('INSERT INTO `dye-colors-search` (color,more,ip) VALUES(?,?,?)').bind(color,more,ip));
  });*/
}