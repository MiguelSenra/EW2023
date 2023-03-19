var express = require("express");
var router = express.Router();
var Task = require("../controllers/task");
var User = require("../controllers/user");

/* GET home page. */
router.get("/", function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  Task.list()
    .then((tasks) => {
      var lista_done = [];
      var lista_not_done = [];

      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]["done"] == 1) {
          lista_done.push(tasks[i]);
        } else lista_not_done.push(tasks[i]);
      }

      var max = Math.max(lista_done.length, lista_not_done.length);

      res.render("pagPrincipal", {
        lista_not_done: lista_not_done,
        lista_done: lista_done,
        max: max,
        date: d,
      });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

router.get("/tasks/add", function (req, res) {
  var d = new Date().toISOString().substring(0, 16);
  Task.list()
    .then((tasks) => {
      User.list().then((users) => {
        var lista_done = [];
        var lista_not_done = [];

        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i]["done"] == 1) {
            lista_done.push(tasks[i]);
          } else lista_not_done.push(tasks[i]);
        }

        var max = Math.max(lista_done.length, lista_not_done.length);

        res.render("addTask", {
          lista_not_done: lista_not_done,
          lista_done: lista_done,
          users: users,
          max: max,
          date: d,
        });
      });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

router.post("/tasks/add", function (req, res) {
  Task.addTask(req.body)
    .then(() => {
      res.render("ConfirmOperation", {
        titulo: "Task Added",
        object: req.body,
      });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

router.get("/users/add", function (req, res) {
  var d = new Date().toISOString().substring(0, 16);
  Task.list()
    .then((tasks) => {
      var lista_done = [];
      var lista_not_done = [];

      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]["done"] == 1) {
          lista_done.push(tasks[i]);
        } else lista_not_done.push(tasks[i]);
      }

      var max = Math.max(lista_done.length, lista_not_done.length);

      res.render("pagPrincipal", {
        form_pessoa: 1,
        lista_not_done: lista_not_done,
        lista_done: lista_done,
        max: max,
        date: d,
      });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

router.post("/users/add", function (req, res) {
  User.addUser(req.body)
    .then(() => {
      res.render("ConfirmOperation", {
        titulo: "User Added",
        object: req.body,
      });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

router.get("/tasks/edit/:idTask", function (req, res) {
  var d = new Date().toISOString().substring(0, 16);
  Task.list()
    .then((tasks) => {
      Task.getTask(req.params.idTask)
        .then((task) => {
          User.list()
            .then((users) => {
              var lista_done = [];
              var lista_not_done = [];

              for (let i = 0; i < tasks.length; i++) {
                if (tasks[i]["done"] == 1) {
                  lista_done.push(tasks[i]);
                } else lista_not_done.push(tasks[i]);
              }

              var max = Math.max(lista_done.length, lista_not_done.length);

              res.render("editTask", {
                lista_not_done: lista_not_done,
                lista_done: lista_done,
                task: task,
                users: users,
                max: max,
                date: d,
              });
            })
            .catch((erro) => {
              res.render("error", { error: erro });
            });
        })
        .catch((erro) => {
          res.render("error", { error: erro });
        });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

router.post("/tasks/edit", function (req, res) {
  Task.PutTask(req.body)
    .then(() => {
      res.render("ConfirmOperation", {
        titulo: "Task Modified",
        object: req.body,
      });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

router.get("/tasks/:idTask", function (req, res) {
  var d = new Date().toISOString().substring(0, 16);
  Task.list()
    .then((tasks) => {
      Task.getTask(req.params.idTask)
        .then((task) => {
          User.getUser(task["executor"])
            .then((user) => {
              var lista_done = [];
              var lista_not_done = [];

              for (let i = 0; i < tasks.length; i++) {
                if (tasks[i]["done"] == 1) {
                  lista_done.push(tasks[i]);
                } else lista_not_done.push(tasks[i]);
              }

              var max = Math.max(lista_done.length, lista_not_done.length);
              task["executor"] = user["nome"];

              res.render("DetailTask", {
                lista_not_done: lista_not_done,
                lista_done: lista_done,
                task: task,
                user: user,
                max: max,
                date: d,
              });
            })
            .catch((erro) => {
              res.render("error", { error: erro });
            });
        })
        .catch((erro) => {
          res.render("error", { error: erro });
        });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

router.get("/tasks/done/:idTask", function (req, res) {
  Task.getTask(req.params.idTask)
    .then((task) => {
      task["done"] = 1;
      Task.PutTask(task)
        .then(() => {
          res.render("ConfirmOperation", { titulo: "Task done", object: task });
        })
        .catch((erro) => {
          res.render("error", { error: erro });
        });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

router.get("/tasks/delete/:idTask", function (req, res) {
  Task.getTask(req.params.idTask)
    .then((task) => {
      Task.deleteTask(task["id"])
        .then(() => {
          res.render("ConfirmOperation", {
            titulo: "Task Deleted",
            object: task,
          });
        })
        .catch((erro) => {
          res.render("error", { error: erro });
        });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

module.exports = router;
