var http = require("http"); //importar módulos para a variável http
//var meta = require('./aux')
var url = require("url");
var fs = require("fs");

var myServer = http.createServer(function (req, res) {
  //console.log(req.method + " " + req.url+" "+ meta.myDateTime())

  var pedido = url.parse(req.url, true).pathname;

  //GET  // Post --enviar info para servidor // Put-- alteração de dados no servidor

  if (pedido == "/") {
    fs.readFile("index.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      if (err) {
        res.write("Erro: na leitura do ficheiro:: " + err);
      } else {
        res.write(data);
      }
      res.end();
    });
  } else {
    fs.readFile(pedido.substring(1) + ".html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      if (err) {
        res.write("Erro: na leitura do ficheiro:: " + err);
      } else {
        res.write(data);
      }
      res.end();
    });
  }
}); //DELETE -- apagar info

myServer.listen(7777);
console.log("Servidor à escuta na porta 7777");

//TPC
//index.html-"indice de cidades"
//c1.html- pagina individual de cada cidade
//c2.html
// .
// .
// .

//link com chamada ao servidor

//localhost:porta/ -> index
//localhost:porta/c1
//localhost:porta/c2
//localhost:porta/c3
