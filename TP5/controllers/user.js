axios = require("axios");

module.exports.list = () => {
  return axios
    .get("http://localhost:3000/users?_sorted=nome")
    .then((resposta) => {
      return resposta.data;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.getUser = (idUser) => {
  return axios
    .get("http://localhost:3000/users/" + idUser)
    .then((resposta) => {
      return resposta.data;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.addUser = (User) => {
  return axios
    .post("http://localhost:3000/users", User)
    .then((resposta) => {
      return resposta.data;
    })
    .catch((erro) => {
      return erro;
    });
};
