axios = require("axios");

module.exports.list = () => {
  return axios
    .get("http://localhost:3000/tasks?_sorted=data_limite")
    .then((resposta) => {
      return resposta.data;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.getTask = (idtask) => {
  return axios
    .get("http://localhost:3000/tasks/" + idtask)
    .then((resposta) => {
      return resposta.data;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.addTask = (task) => {
  return axios
    .post("http://localhost:3000/tasks", task)
    .then((resposta) => {
      return resposta.data;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.PutTask = (task) => {
  return axios
    .put("http://localhost:3000/tasks/" + task["id"], task)
    .then((resposta) => {
      return resposta.data;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.deleteTask = (id_task) => {
  return axios
    .delete("http://localhost:3000/tasks/" + id_task)
    .then((resposta) => {
      return resposta.data;
    })
    .catch((erro) => {
      return erro;
    });
};
