var Person = require("../models/person");

// Person list
module.exports.lista_modalidades = () => {
  return Person.find()
    .then((resposta) => {
      return resposta;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.getPerson = (id) => {
  return Person.findOne({ _id: id })
    .then((resposta) => {
      return resposta;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.addPerson = (p) => {
  return Person.create(p)
    .then((resposta) => {
      return resposta;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.updatePerson = (p) => {
  return Person.updateOne({ _id: p._id }, p)
    .then((resposta) => {
      return resposta;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.deletePerson = (id) => {
  return Person.deleteOne({ _id: id })
    .then((resposta) => {
      return resposta.data;
    })
    .catch((erro) => {
      return erro;
    });
};

