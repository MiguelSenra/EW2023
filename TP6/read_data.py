import json
import requests

# carregar o ficheiro json
f = open("pessoas.json")
pessoas = json.load(f)
pessoas = pessoas["pessoas"]

# percorrer todas as pessoas
for pessoa in pessoas:
    # alterar a chave id para esta ser a chave principal no mongodb
    pessoa["_id"] = pessoa["id"]
    pessoa.pop("id")
    # verificar se uma pessoa ja existe na base de dados
    existe = requests.get("http://localhost:3000/pessoas/"+pessoa["_id"])
    if (existe):
        # atualizar o registo que está na base de dados pois este pode estar desatualizado
        requests.put("http://localhost:3000/pessoas/" +
                     pessoa["_id"], json=pessoa)
    else:
        # inserir o novo registo
        requests.post("http://localhost:3000/pessoas", json=pessoa)
