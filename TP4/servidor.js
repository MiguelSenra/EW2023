// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require("http");
var axios = require("axios");
var templates = require("./genpages");
var static = require("./static.js");
const { parse } = require("querystring");

// Aux functions

function collectRequestBodyData(request, callback) {
  if (request.headers["content-type"] === "application/x-www-form-urlencoded") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      callback(parse(body));
    });
  } else {
    callback(null);
  }
}

// Server creation

var tasks_Server = http.createServer(function (req, res) {
  // Logger: what was requested and when it was requested
  var d = new Date().toISOString().substring(0, 16);
  console.log(req.method + " " + req.url + " " + d);

  // Handling request
  if (static.staticResource(req)) {
    static.serveStaticResource(req, res);
  } else {
    switch (req.method) {
      case "GET":
        if (req.url == "/" || req.url == "/tasks") {
          axios
            .get("http://localhost:3000/tasks")
            .then((response) => {
              var tasks = response.data;
              res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
              res.write(templates.TasksPage(0, tasks, d));
              res.end();
            })
            .catch(function (erro) {
              res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
              res.write(
                "<p>Não foi possível obter a lista de tarefas... Erro: " + erro
              );
              res.end();
            });
        } else if (req.url == "/tasks/add") {
          axios
            .get("http://localhost:3000/tasks")
            .then((response) => {
              var tasks = response.data;
              axios
                .get("http://localhost:3000/users/")
                .then((response) => {
                  var users = response.data;
                  res.writeHead(200, {
                    "Content-Type": "text/html;charset=utf-8",
                  });
                  res.write(templates.PostTasksPage(0, 0, users, tasks, d));
                  res.end();
                })
                .catch(function (erro) {
                  res.writeHead(200, {
                    "Content-Type": "text/html;charset=utf-8",
                  });
                  res.write(`<p> TASKS ERROR JSON-SERVER! ... Erro:   ` + erro);
                  res.end();
                });
            })
            .catch(function (erro) {
              res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
              res.write(
                "<p>Não foi possível abrir o formulário de registo de novas tarefas... Erro: " +
                  erro
              );
              res.end();
            });
        } else if (/\/tasks\/[a-z A-Z_0-9]+$/i.test(req.url)) {
          var idtask = req.url.split("/")[2];
          axios
            .get("http://localhost:3000/tasks")
            .then((response) => {
              var tasks = response.data;
              res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
              res.write(templates.DetailTaskPage(tasks, idtask, d));
              res.end();
            })
            .catch(function (erro) {
              res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
              res.write(
                "<p>Não foi possível visualizar com detalhe a tarefa... Erro: " +
                  erro
              );
              res.end();
            });
        } else if (req.url == "/users/add") {
          axios
            .get("http://localhost:3000/tasks")
            .then((response) => {
              var tasks = response.data;
              res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
              res.write(templates.TasksPage(1, tasks, d));
              res.end();
            })
            .catch(function (erro) {
              res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
              res.write(
                "<p>Não foi possível abrir o formulário de registo de novos utilizadores)... Erro: " +
                  erro
              );
              res.end();
            });
        } else if (/\/tasks\/done\/[a-z A-Z_0-9]+$/i.test(req.url)) {
          var idtask = req.url.split("/")[3];
          axios
            .get("http://localhost:3000/tasks/" + idtask)
            .then(function (resp) {
              task = resp.data;
              task["done"] = 1;
              axios
                .put("http://localhost:3000/tasks/" + idtask, task)
                .then((resp) => {
                  console.log(resp.data);
                  res.writeHead(200, {
                    "Content-Type": "text/html;charset=utf-8",
                  });
                  res.end(
                    "<p>Registo alterado:" +
                      JSON.stringify(resp.data) +
                      "</p>" +
                      `<p><a href="/tasks"> Voltar ao Menu </a></p>`
                  );
                })
                .catch((error) => {
                  console.log("Erro: " + error);
                  res.writeHead(500, {
                    "Content-Type": "text/html;charset=utf-8",
                  });
                  res.end(templates.errorPage("Unable to put record", d));
                });
            })
            .catch((erro) => {
              console.log("Erro: " + erro);
              res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
              res.end(
                templates.errorPage("Unable to collect record: " + idAluno, d)
              );
            });
        } else if (/\/tasks\/delete\/[a-z A-Z_0-9]+$/i.test(req.url)) {
          var idTask = req.url.split("/")[3];
          axios
            .delete("http://localhost:3000/tasks/" + idTask)
            .then((resp) => {
              console.log("Delete " + idTask + " :: " + resp.status);
              res.writeHead(201, { "Content-Type": "text/html;charset=utf-8" });
              res.end(
                "<p>Registo apagado:" +
                  idTask +
                  "</p>" +
                  `<p><a href="/tasks"> Voltar ao Menu </a></p>`
              );
            })
            .catch((error) => {
              console.log("Erro: " + error);
              res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
              res.end(
                templates.errorPage("Unable to delete record: " + idAluno, d)
              );
            });
        } else if (/\/tasks\/edit\/[a-z A-Z_0-9]+$/i.test(req.url)) {
          var idTask = req.url.split("/")[3];
          axios
            .get("http://localhost:3000/tasks")
            .then((response) => {
              var tasks = response.data;
              axios
                .get("http://localhost:3000/users/")
                .then((response) => {
                  var users = response.data;
                  res.writeHead(200, {
                    "Content-Type": "text/html;charset=utf-8",
                  });
                  res.write(
                    templates.PostTasksPage(1, idTask, users, tasks, d)
                  );
                  res.end();
                })
                .catch(function (erro) {
                  res.writeHead(200, {
                    "Content-Type": "text/html;charset=utf-8",
                  });
                  res.write(`<p> TASKS ERROR JSON-SERVER! ... Erro:   ` + erro);
                  res.end();
                });
            })
            .catch(function (erro) {
              res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
              res.write(
                "<p>Não foi possível abrir o formulário de registo de novas tarefas... Erro: " +
                  erro
              );
              res.end();
            });
        } else {
          res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
          res.write(
            "<p>" +
              req.method +
              " " +
              req.url +
              " unsupported on this server.</p>"
          );
          res.end();
        }
        break;

      case "POST":
        if (req.url == "/tasks/add") {
          collectRequestBodyData(req, (result) => {
            if (result) {
              console.log(result);
              axios
                .post("http://localhost:3000/tasks", result)
                .then((resp) => {
                  console.log(resp.data);
                  res.writeHead(201, {
                    "Content-Type": "text/html;charset=utf-8",
                  });
                  res.end(
                    "<p>Registo inserido:" +
                      JSON.stringify(resp.data) +
                      "</p>" +
                      `<p><a href="/tasks"> Voltar ao Menu </a></p>`
                  );
                })
                .catch((error) => {
                  console.log("Erro: " + error);
                  res.writeHead(500, {
                    "Content-Type": "text/html;charset=utf-8",
                  });
                  res.write("<p>Unable to insert new task</p>");
                  res.end();
                });
            } else {
              res.writeHead(201, { "Content-Type": "text/html;charset=utf-8" });
              res.write("<p>Unable to collect data from body...</p>");
              res.end();
            }
          });
        } else if (req.url == "/users/add") {
          collectRequestBodyData(req, (result) => {
            if (result) {
              console.log(result);
              axios
                .post("http://localhost:3000/users", result)
                .then((resp) => {
                  console.log(resp.data);
                  res.writeHead(201, {
                    "Content-Type": "text/html;charset=utf-8",
                  });
                  res.end(
                    "<p>Registo inserido:" +
                      JSON.stringify(resp.data) +
                      "</p>" +
                      `<p><a href="/tasks"> Voltar ao Menu </a></p>`
                  );
                })
                .catch((error) => {
                  console.log("Erro: " + error);
                  res.writeHead(500, {
                    "Content-Type": "text/html;charset=utf-8",
                  });
                  res.write("<p>Unable to insert new user.</p>");
                  res.end();
                });
            } else {
              res.writeHead(201, { "Content-Type": "text/html;charset=utf-8" });
              res.write("<p>Unable to collect data from body...</p>");
              res.end();
            }
          });
        } else if (/\/tasks\/edit\/[a-z A-Z_0-9]+$/i.test(req.url)) {
          collectRequestBodyData(req, (result) => {
            if (result) {
              console.dir(result);
              axios
                .put("http://localhost:3000/tasks/" + result.id, result)
                .then((resp) => {
                  console.log(resp.data);
                  res.writeHead(200, {
                    "Content-Type": "text/html;charset=utf-8",
                  });
                  res.end(
                    "<p>Registo alterado:" +
                      JSON.stringify(resp.data) +
                      "</p>" +
                      `<p><a href="/tasks"> Voltar ao Menu </a></p>`
                  );
                })
                .catch((error) => {
                  console.log("Erro: " + error);
                  res.writeHead(500, {
                    "Content-Type": "text/html;charset=utf-8",
                  });
                  res.end(templates.errorPage("Unable to insert record...", d));
                });
            } else {
              res.writeHead(201, { "Content-Type": "text/html;charset=utf-8" });
              res.write(
                "<p>Unable to collect data from body...</p>" +
                `<p><a href="/tasks"> Voltar ao Menu </a></p>`
              );
              res.end();
            }
          });
        } else {
          res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
          res.write("<p>Unsupported POST request: " + req.url + "</p>");
          res.write(`<p><a href="/tasks"> Voltar ao Menu </a></p>`);
          res.end();
        }
        break;
      default:
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write("<p>" + req.method + " unsupported in this server.</p>");
        res.end();
    }
  }
});

tasks_Server.listen(7777, () => {
  console.log("Servidor à escuta na porta 7777...");
});
