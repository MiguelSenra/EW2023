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
            <p><a href="/">Voltar atrás</a></p>
            </div>
            <footer class="w3-container w3-purple">
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
    <ul class="w3-ul w3-card-4">
    <li><b>Idade : </b>${p.idade}</li>
    <li><b>Sexo : </b>${p.sexo}</li>
    <li><b>Morada : </b>${p.morada.cidade},${p.morada.distrito}</li>
    <li><b>BI : </b>${p.BI}</li>
    <li><b>Profissao : </b>${p.profissao}</li>
    <li><b>Partido Politico : </b>${p.partido_politico.party_abbr} : ${p.partido_politico.party_name}</li>
    <li><b>Religiao : </b>${p.religiao}</li>
    <li><b>Desportos : </b>${p.desportos}</li>
    <li><b>Animais : </b>${p.animais}</li>
    <li><b>Figura Pública : </b>${p.figura_publica_pt}</li>
    <li><b>marca_carro : </b>${p.marca_carro}</li>
    <li><b>destinos_favoritos : </b>${p.destinos_favoritos}</li>
    <li><b>atributos : </b>
    `;
  for (const key of Object.keys(p.atributos)) {
    if (p.atributos[key] == true) pagHTML += `${key}, `;
  }

  pagHTML += `</li>
    <li><b>Comida Favorita</b>: ${p.atributos["comida_favorita"]}</li>
    </ul>
    <p><a href="/">Voltar atrás</a></p>
    </div>
    <footer class="w3-container w3-purple">
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

  var list = Object.entries(dist).sort(([, a], [, b]) => b - a);

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

  for (const elem of list) {
    htmlpage += `
        <tr>
        <td><a href="/pessoas/distribuicao_sexo/${elem[0]}">${elem[0]}</a></td> 
        <td>${elem[1]}</td>
        </tr>
    `;
  }

  htmlpage += `
            </table>
            <p><a href="/">Voltar atrás</a></p>
            </div>
            <footer class="w3-container w3-purple">
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
  var list = Object.entries(dist).sort(([, a], [, b]) => b - a);

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
        <td><a href="/pessoas/distribuicao_desporto/${elem[0]}">${elem[0]}</a></td> 
        <td>${elem[1]}</td>
        </tr>
    `;
  }

  htmlpage += `
            </table>
            <p><a href="/">Voltar atrás</a></p>
            </div>
            <footer class="w3-container w3-purple">
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
            <p><a href="/">Voltar atrás</a></p>
            </div>
            <footer class="w3-container w3-purple">
        <adress>Generated in EngWeb2023 ${d}</adress>
    </footer>
    </div>
        </body>
        </html>
    `;
  return htmlpage;
};

exports.genMenu = function () {
  pagHTML = `
  <!DOCTYPE html>
<html>
    <head>
        <title>About People..</title>
        <meta charset = "utf-8"/>
        <link rel="stylesheet" type="text/css" href="w3.css"/>
    </head>
    <body>
    <header class="w3-container w3-purple">
                <h1> Menu Principal</h1>
            </header>
       <div class="w3-ul w3-Indigo">
        <ul>
        <li><h1><a href="/pessoas">Listar todas as pessoas </a></h1></li>
        <li><h1><a href="/pessoasOrdenadas">Listar todas as pessoas ordenadas alfabeticamente </a></h1></li>
        <li><h1><a href="/pessoas/distribuicao_sexo">Distribuição de pessoas por sexo </a></h1></li>
        <li><h1><a href="/pessoas/distribuicao_desporto">Distribuição de pessoas por desporto </a></h1></li>
        <li><h1><a href="/pessoas/top10_profissoes">Top 10 de profissões</a></h1></li>
        </ul>
      </div>
      <footer class="w3-container w3-purple">
        <adress>Generated in EngWeb2023 </adress>
    </footer>
        </body>
    </html>
  
  `;
  return pagHTML;
};
