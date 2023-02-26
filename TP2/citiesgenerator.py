import json

f = open("mapa.json")
mapa = json.load(f)
cid = mapa["cidades"]
lig = mapa["ligações"]
ligações = dict()
cidades = dict()

for cidade in cid:
    cod = cidade['id']
    cidade.pop('id')
    cidades[cod] = cidade


for ligação in lig:
    cod_o = ligação['origem']
    if cod_o not in ligações:
        ligações[cod_o] = []

    cod_d = ligação['destino']
    if cod_d not in ligações:
        ligações[cod_d] = []

    ligação.pop('origem')
    ligações[cod_o].append(ligação)

    ligação2 = dict()  # Sem esta cópia estaria a alterar o apontador pelo que alteraria o valor colocado acima para um valor errado
    ligação2.update(ligação)
    ligação2['destino'] = cod_o
    ligações[cod_d].append(ligação2)

    # Finalização da alteração da estrutura de dados para uma melhor procura dos dados

for key in cidades:
    cidade = cidades[key]
    pagHTML = f"""
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset = "utf-8"/>
    </head>
    <body>
        <h1>{cidade['nome']}</h1>
        <p><b>População:</b> {cidade['população']} pessoas</p>
        <p><b>Descrição:</b> {cidade['descrição']}</p>
        <p><b>Distrito:</b> {cidade['distrito']}</p>
        <h2>Ligações</h2>
"""

    # lista de ligações para uma cidade
    lista = []
    for ligação in ligações[key]:
        lista.append(((cidades[ligação['destino']])[
                     'nome'], ligação['distância'], ligação['destino']))

    lista.sort()
    pagHTML += """ 
            <table>
        """

    for nome, dist, dest_id in lista:
        pagHTML += f"""
            <tr>
                <td>
                    <b>Destino:</b> <a href="{dest_id}">{nome}</a>  
                </td>
                <td>
                    <b> Distância:</b> {dist} km
                </td>
            </tr>
            """
    pagHTML += f""" 
        </table>
        <a href="/">Voltar à página Principal</a>
        </body>
    </html>
    """
    file = open(key+".html", "w")
    file.write(pagHTML)
    file.close()
