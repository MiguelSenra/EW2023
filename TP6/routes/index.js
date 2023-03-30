var express = require("express");
var router = express.Router();
var Person = require("../controllers/person");

router.get("/", function (req, res, next) {
  Person.list()
    .then((dados) => {
      res.status(200).json(dados);
    })
    .catch((erro) => {
      res.status(520).json({
        erro: erro,
        mensagem: "Não consegui obter a lista da pessoa",
      });
    });
});

router.get("/pessoas", function (req, res, next) {
  Person.list()
    .then((dados) => {
      res.status(200).json(dados);
    })
    .catch((erro) => {
      res.status(520).json({
        erro: erro,
        mensagem: "Não consegui obter a lista da pessoa",
      });
    });
});

router.get("/pessoas/:id", function (req, res) {
  Person.getPerson(req.params.id)
    .then((Person) => {
      res.status(200).json(Person);
    })
    .catch((erro) => {
      res.status(521).json({
        erro: erro,
        mensagem: "Não consegui obter o registo da pessoa",
      });
    });
});

router.post("/pessoas", function (req, res) {
  Person.addPerson(req.body)
    .then((dados) => {
      res.status(201).json(dados);
    })
    .catch((erro) => {
      res.status(522).json({
        erro: erro,
        mensagem: "Não consegui inserir a pessoa",
      });
    });
});

router.put("/pessoas/:id", function (req, res) {
  Person.updatePerson(req.body)
    .then((dados) => {
      res.status(200).json(dados);
    })
    .catch((erro) => {
      res.status(523).json({
        erro: erro,
        mensagem: "Não consegui alterar a pessoa",
      });
    });
});

router.delete("/pessoas/:id", function (req, res) {
  Person.deletePerson(req.params.id)
    .then((dados) => {
      res.status(200).json(dados);
    })
    .catch((erro) => {
      res.status(524).json({
        erro: erro,
        mensagem: "Não consegui apagar o Person",
      });
    });
});

module.exports = router;
