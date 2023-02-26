import json


def ordCidade(c):
    return c['distrito'], c['nome']


f = open("mapa.json")
mapa = json.load(f)
cidades = mapa["cidades"]
ligações = mapa["ligações"]
cidades.sort(key=ordCidade)

pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset = "utf-8"/>
    </head>
    <body>
        <center>
            <h1>Mapa Virtual</h1>
        </center>
"""
distAtual = ""
for cidade in cidades:
    if cidade["distrito"] != distAtual:
        distAtual = cidade["distrito"]
        pagHTML += f"""
        <h2>{distAtual}</h2>
        """

    pagHTML += f""" 
       <p> <a href="{cidade['id']}"> {cidade["nome"]} </a></p>
    """


pagHTML += """ 
    </body>
</html>"""

print(pagHTML)
