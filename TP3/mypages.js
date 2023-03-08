//mypages.js
//2023-03-03 by MiguelSenra
//HTML templates

exports.genMainPage = function (lista, data) {
  var pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <title>About People..</title>
        <meta charset = "utf-8"/>
        <link rel="stylesheet" type="text/css" href="w3.css"/>
    </head>
    <body>
       <div class="w3-card-4">
            <header class="w3-container w3-purple">
            <h1> Lista de Pessoas </h1>
        </header>
    
    <div class="w3-container"> 
        <table class="w3-table-all" >
        <tr> 
            <th>Id</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Sexo</th>
            <th>Cidade</th>
        </tr>
    `;
  for (let i = 0; i < lista.length; i++) {
    pagHTML += `
        <tr>
            <td>${lista[i].id}</td>
            <td><a href="/pessoas/${lista[i].id}">${lista[i].nome}</a></td>
            <td>${lista[i].idade}</td>
            <td>${lista[i].sexo}</td>
            <td>${lista[i].morada.cidade}</td>
        </tr>
        `;
  }

  pagHTML += `
            </table>
            </div>
            <footer class="w3-container w3-blue">
        <adress>Generated in EngWeb2023 ${data}</adress>
    </footer>
    </div>
        </body>
    </html>
    `;
  return pagHTML;
};

exports.genPersonPage = function (p, d) {
  var pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <title>Person Page</title>
        <meta charset = "utf-8"/>
        <link rel="stylesheet" type="text/css" href="w3.css"/>
    </head>
    <body>
    <div class="w3-card-4">
            <header class="w3-container w3-purple">
            <h1>${p.nome} </h1>
        </header>
    <div class=container>
    <p>idade:${p.idade}</p>
    <p>sexo:${p.sexo}</p>
    <p>morada:${p.morada.cidade},${p.morada.distrito}</p>
    <p>BI:${p.BI}</p>
    <p>profissao:${p.profissao}</p>
    <p>partido_Politico:${p.partido_politico}</p>
    <p>religiao:${p.religiao}</p>
    <p>desportos:${p.desportos}</p>
    <p>animais:${p.animais}</p>
    <p>figura_publica_pt:${p.figura_publica_pt}</p>
    <p>marca_carro:${p.marca_carro}</p>
    <p>destinos_favoritos:${p.destinos_favoritos}</p>
    <p>atributos:${p.atributos}</p>
    </div>
    <footer class="w3-container w3-blue">
        <adress>Generated in EngWeb2023 ${d}</adress>
    </footer>
    </div>
    </body>
    </html>
`;
  return pagHTML;
};

exports.genDitributionSexpage = function (data, d) {
  var dist = {};
  for (let i = 0; i < data.length; i++) {
    if (!(data[i].sexo in dist)) {
      dist[data[i].sexo] = 1;
    } else {
      dist[data[i].sexo]++;
    }
  }
  var htmlpage = `
        <!DOCTYPE html>  
        <html>
        <head>
            <title>Person Page</title>
            <meta charset = "utf-8"/>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
        <div class="w3-card-4">
            <header class="w3-container w3-purple">
                <h1> Distribuição do Sexo </h1>
            </header>

        <div class="w3-container"> 
        <table class="w3-table-all">
                <tr>
                    <th>Género</th>
                    <th>Número de Pessoas</th>
                </tr>
    `;

  for (const key of Object.keys(dist)) {
    htmlpage += `
        <tr>
        <td><a href="/pessoas/distribuicao_sexo/${key}">${key}</a></td> 
        <td>${dist[key]}</td>
        </tr>
    `;
  }

  htmlpage += `
            </table>
            </div>
            <footer class="w3-container w3-blue">
        <adress>Generated in EngWeb2023 ${d}</adress>
    </footer>
    </div>
        </body>
        </html>
    `;
  return htmlpage;
};

exports.genDitributionSportspage = function (data, d) {
  var dist = {};
  for (let i = 0; i < data.length; i++) {
    var lista = new Array(); //para não acrescentar desportos repetidos
    for (elem of data[i].desportos) {
      if (!(elem in dist)) {
        dist[elem] = 1;
      } else if (!lista.includes(elem)) {
        dist[elem]++;
        lista.push(elem);
      }
    }
  }
  var htmlpage = `
        <!DOCTYPE html>  
        <html>
        <head>
            <title>Person Page</title>
            <meta charset = "utf-8"/>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
        <div class="w3-card-4">
            <header class="w3-container w3-purple">
                <h1> Distribuição de Desportos</h1>
            </header>

        <div class="w3-container"> 
        <table class="w3-table-all">
                <tr>
                    <th>Desporto</th>
                    <th>Número de Praticantes</th>
                </tr>
    `;

  for (const key of Object.keys(dist)) {
    htmlpage += `
        <tr>
        <td><a href="/pessoas/distribuicao_desporto/${key}">${key}</a></td> 
        <td>${dist[key]}</td>
        </tr>
    `;
  }

  htmlpage += `
            </table>
            </div>
            <footer class="w3-container w3-blue">
        <adress>Generated in EngWeb2023 ${d}</adress>
    </footer>
    </div>
        </body>
        </html>
    `;
  return htmlpage;
};

exports.genDitributiontop10_profissoes = function (data, d) {
  var dist = {};
  for (let i = 0; i < data.length; i++) {
    var lista = [];
    if (!(data[i].profissao in dist)) {
      dist[data[i].profissao] = 1;
    } else {
      dist[data[i].profissao]++;
    }
  }
  var list = Object.entries(dist)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  var htmlpage = `
        <!DOCTYPE html>  
        <html>
        <head>
            <title>Person Page</title>
            <meta charset = "utf-8"/>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
        <div class="w3-card-4">
            <header class="w3-container w3-purple">
                <h1> Distribuição de Desportos</h1>
            </header>

        <div class="w3-container"> 
        <table class="w3-table-all">
                <tr>
                    <th>Desporto</th>
                    <th>Número de Praticantes</th>
                </tr>
    `;

  for (const elem of list) {
    htmlpage += `
        <tr>
        <td><a href="/pessoas/top10_profissoes/${elem[0]}">${elem[0]}</a></td> 
        <td>${elem[1]}</td>
        </tr>
    `;
  }

  htmlpage += `
            </table>
            </div>
            <footer class="w3-container w3-blue">
        <adress>Generated in EngWeb2023 ${d}</adress>
    </footer>
    </div>
        </body>
        </html>
    `;
  return htmlpage;
};
