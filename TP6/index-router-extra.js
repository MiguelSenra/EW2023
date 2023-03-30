var express = require("express");
var router = express.Router();
var Exame = require("../controllers/emd");

router.get("/", function (req, res, next) {
  Exame.list()
    .then((dados) => {
      res.status(200).json(dados);
    })
    .catch((erro) => {
      res
        .status(520)
        .json({ erro: erro, mensagem: "Não consegui obter a lista de exames" });
    });
});

router.get("/emds", function (req, res, next) {
  if (!req.query.status) {
    return next();
  }
  let status = req.query.status;
  console.log(status);
  if (status == "apto") {
    Exame.numAptos()
      .then((dados) => {
        res.status(200).json({ Aptos: dados });
      })
      .catch((erro) => {
        res.status(524).json({
          erro: erro,
          mensagem: "Não consegui obter o número de aptos",
        });
      });
  }
});

router.get("/emds", function (req, res, next) {
  Exame.list()
    .then((dados) => {
      res.status(200).json(dados);
    })
    .catch((erro) => {
      res
        .status(520)
        .json({ erro: erro, mensagem: "Não consegui obter a lista de exames" });
    });
});

router.get("/emds/modalidades", function (req, res) {
  Exame.list()
    .then((dados) => {
      var lista = [];
      for (const data of dados) {
        if (!lista.includes(data["modalidade"])) {
          lista.push(data["modalidade"]);
        }
      }
      lista.sort();
      res.status(200).json({ modalidades: lista });
    })
    .catch((erro) => {
      res.status(524).json({
        erro: erro,
        mensagem: "Não consegui obter a lista de modalidades",
      });
    });
});

router.get("/emds/atletas", function (req, res) {
  Exame.list()
    .then((dados) => {
      var lista = [];
      for (const data of dados) {
        var nome = data["nome"]["primeiro"] + " " + data["nome"]["último"];
        if (!lista.includes(nome)) {
          lista.push(nome);
        }
      }
      lista.sort();
      res.status(200).json({ atletas: lista });
    })
    .catch((erro) => {
      res.status(524).json({
        erro: erro,
        mensagem: "Não consegui obter a lista de atletas",
      });
    });
});

router.get("/emds/aptos", function (req, res) {
  Exame.numAptos()
    .then((dados) => {
      res.status(200).json({ Aptos: dados });
    })
    .catch((erro) => {
      res.status(524).json({
        erro: erro,
        mensagem: "Não consegui obter o número de aptos",
      });
    });
});

router.get("/emds/:id", function (req, res) {
  Exame.getExame(req.params.id)
    .then((exame) => {
      res.status(200).json(exame);
    })
    .catch((erro) => {
      res.status(521).json({
        erro: erro,
        mensagem: "Não consegui obter o registo do exame",
      });
    });
});

router.post("/emds", function (req, res) {
  Exame.addExame(req.body)
    .then((dados) => {
      res.status(201).json(dados);
    })
    .catch((erro) => {
      res.status(522).json({
        erro: erro,
        mensagem: "Não consegui inserir o exame",
      });
    });
});

router.put("/emds/:id", function (req, res) {
  Exame.updateExame(req.body)
    .then((dados) => {
      res.status(200).json(dados);
    })
    .catch((erro) => {
      res.status(523).json({
        erro: erro,
        mensagem: "Não consegui alterar o exame",
      });
    });
});

router.delete("/emds/:id", function (req, res) {
  Exame.deleteExame(req.params.id)
    .then((dados) => {
      res.status(200).json(dados);
    })
    .catch((erro) => {
      res.status(524).json({
        erro: erro,
        mensagem: "Não consegui apagar o exame",
      });
    });
});
module.exports = router;
