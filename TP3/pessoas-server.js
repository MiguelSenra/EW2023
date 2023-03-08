var http = require("http"); //importar módulos para a variável http
const axios = require("axios");
var mypages = require("./mypages");
var fs = require("fs");

var myServer = http.createServer(function (req, res) {
  var d = new Date().toISOString().substring(0, 16);
  //GET  // Post --enviar info para servidor // Put-- alteração de dados no servidor
  console.log(req.method + " " + req.url + " " + d);
  if (req.url == "/pessoas") {
    axios
      .get("http://localhost:3000/pessoas")
      .then(function (resp) {
        var pessoas = resp.data;
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write(mypages.genMainPage(pessoas, d));
        res.end();
      })
      .catch((erro) => {
        console.log("Erro:" + erro);
        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
        res.end("<p>operação não suportada:" + req.url + " </p>");
      });
  } else if (req.url == "/pessoasOrdenadas") {
    axios
      .get("http://localhost:3000/pessoas?_sort=nome")
      .then(function (resp) {
        var pessoas = resp.data;
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write(mypages.genMainPage(pessoas, d));
        res.end();
      })
      .catch((erro) => {
        console.log("Erro:" + erro);
        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
        res.end("<p>operação não suportada:" + req.url + " </p>");
      });
  } else if (req.url.match(/\/pessoas\/p\d+/)) {
    console.log("pedindo " + req.url.substring(9));
    axios
      .get("http://localhost:3000/pessoas/" + req.url.substring(9))
      .then(function (resp) {
        var pessoa = resp.data;
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write(mypages.genPersonPage(pessoa, d));
        res.end();
      })
      .catch((erro) => {
        console.log("Erro:" + erro);
        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
        res.end("<p>operação não suportada:" + req.url + " </p>");
      });
  } else if (req.url.match(/w3\.css$/)) {
    fs.readFile("w3.css", function (erro, dados) {
      if (erro) {
        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
        res.end("<p>Erro na leitura do ficheiro:" + req.url + " </p>");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(dados);
      }
    });
  } else if (req.url == "/pessoas/distribuicao_sexo") {
    axios
      .get("http://localhost:3000/pessoas")
      .then(function (resp) {
        var pessoas = resp.data;
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write(mypages.genDitributionSexpage(pessoas, d));
        res.end();
      })
      .catch((erro) => {
        console.log("Erro:" + erro);
        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
        res.end("<p>operação não suportada:" + req.url + " </p>");
      });
  } else if (req.url.match(/\/pessoas\/distribuicao_sexo\/\w+/)) {
    console.log("pedindo " + req.url.substring(27));
    axios
      .get("http://localhost:3000/pessoas?sexo=" + req.url.substring(27))
      .then(function (resp) {
        var pessoa = resp.data;
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write(mypages.genMainPage(pessoa, d));
        res.end();
      })
      .catch((erro) => {
        console.log("Erro:" + erro);
        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
        res.end("<p>operação não suportada:" + req.url + " </p>");
      });
  } else if (req.url == "/pessoas/distribuicao_desporto") {
    axios
      .get("http://localhost:3000/pessoas")
      .then(function (resp) {
        var pessoas = resp.data;
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write(mypages.genDitributionSportspage(pessoas, d));
        res.end();
      })
      .catch((erro) => {
        console.log("Erro:" + erro);
        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
        res.end("<p>operação não suportada:" + req.url + " </p>");
      });
  } else if (req.url.match(/\/pessoas\/distribuicao_desporto\/\w+/)) {
    console.log("pedindo " + req.url.substring(31));
    axios
      .get("http://localhost:3000/pessoas")
      .then(function (resp) {
        var pessoas = resp.data;
        let pessoasOrdenadas = pessoas.sort(
          (p1, p2) => (p1.nome < p2.nome ? -1 : 1) // nao usa o utf 8 dai os acentuados serem ultimos , assume sempre o ascii
        );

        var desporto = req.url.substring(31);

        var lista = new Array();

        for (const p of pessoasOrdenadas) {
          if (p.desportos.includes(desporto)) lista.push(p);
        }
        console.log(lista.length);

        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write(mypages.genMainPage(lista, d));
        res.end();
      })
      .catch((erro) => {
        console.log("Erro:" + erro);
        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
        res.end("<p>operação não suportada:" + req.url + " </p>");
      });
  } else if (req.url == "/pessoas/top10_profissoes") {
    axios
      .get("http://localhost:3000/pessoas")
      .then(function (resp) {
        var pessoas = resp.data;
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write(mypages.genDitributiontop10_profissoes(pessoas, d));
        res.end();
      })
      .catch((erro) => {
        console.log("Erro:" + erro);
        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
        res.end("<p>operação não suportada:" + req.url + " </p>");
      });
  } else if (req.url.match(/\/pessoas\/top10_profissoes\/\w+/)) {
    console.log("pedindo " + req.url.substring(26));
    axios
      .get("http://localhost:3000/pessoas?profissao=" + req.url.substring(26))
      .then(function (resp) {
        var pessoa = resp.data;
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write(mypages.genMainPage(pessoa, d));
        res.end();
      })
      .catch((erro) => {
        console.log("Erro:" + erro);
        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
        res.end("<p>operação não suportada:" + req.url + " </p>");
      });
  } else {
    res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
    res.end("<p>operação não suportada:" + req.url + " </p>");
  }
}); //DELETE -- apagar info

myServer.listen(7777);
console.log("Servidor à escuta na porta 7777");

///tpc

//quando o pedido for localhost:7777/

//lista de pessoas
//lista de pessoas ordenadas
//distribuição por sexo
//distribuição por desporto
//top 10 de profissoes
