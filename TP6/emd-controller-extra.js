var Exame = require("../models/exames");

// Exame list
module.exports.list = () => {
  return Exame.find()
    .sort({ dataEMD: -1 })
    .then((resposta) => {
      return resposta;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.getExame = (id) => {
  return Exame.findOne({ _id: id })
    .then((resposta) => {
      return resposta;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.addExame = (e) => {
  return Exame.create(e)
    .then((resposta) => {
      return resposta;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.updateExame = (a) => {
  return Exame.updateOne({ _id: a._id }, a)
    .then((resposta) => {
      return resposta;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.deleteExame = (id) => {
  return Exame.deleteOne({ _id: id })
    .then((resposta) => {
      return resposta.data;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.numAptos = () => {
  return Exame.find({ resultado: true })
    .count()
    .then((resposta) => {
      return resposta;
    })
    .catch((erro) => {
      return erro;
    });
};
