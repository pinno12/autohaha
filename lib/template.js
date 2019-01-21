module.exports = {
  HTML:function(sanitizedDescription, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${sanitizedDescription}

    </body>
    </html>
    `;
  }
  // ,list:function(filelist){
  //   var list = '<ul>';
  //   var i = 0;
  //   while(i < filelist.length){
  //     list = list + `<li><a href="/page/${filelist[i]}">${filelist[i]}</a></li>`;
  //     i = i + 1;
  //   }
  //   list = list+'</ul>';
  //   return list;
  }
