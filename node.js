var http= require('http');
http.createServer(function(req, res){
  res.write("Hello World; Welcome to this tutorial follow me on Github my name is Bruno");
  res.end();
}).listen(8500);

// console.log("hello world");
