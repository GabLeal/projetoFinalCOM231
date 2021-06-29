<p align="center">
  <img src="/unifei.png" width="150">
<p/>

<div>
    
  <h2 align='center'>UNIFEI - Universidade Federal de Itajubá<br><br>Trabalho final da matéria COM231 - Banco de dados II</h2>


</div>


## Tecnologias Utilizadas

<img alt="node.js" src="https://img.shields.io/badge/-node.js-44883e?logo=Node.js&logoColor=white&style=for-the-badge"> <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/> <img alt="Sequelize%20orm" src="https://img.shields.io/badge/-Sequelize%20orm-blue?style=for-the-badge"> <img alt="Jmeter" src="https://img.shields.io/badge/-Jmeter-crimson?logo=Apache&style=for-the-badge">




## Objetivo
Coletar dados de uma API, modelá-los utilizando o modelo relacional, realizar a carga
e otimização do banco de dados e implementar um relatório ad-hoc para apresentação desses
dados.


### 1ª Etapa
- [x] Selecionar a APIs de dados

### 2ª Etapa
- [x] Estudar os dados da API e definir quais serão consumidos
- [x] Gerar um modelo relacional a partir dos dados consumidos
- [x] Implementar o banco de dados relacional

### 3ª Etapa
- [x] Desenvolver uma aplicação para consumir os dados da API
- [x] Dar carga no banco de dados
- [x] Otimizar o banco de dados

### 4ª Etapa
- [ ] Estudar sobre Relatórios Ad-Hoc
- [ ] Implementar uma aplicação que gere Relatórios Ad-Hoc dinamicamente para a base de dados
analisada

### 5ª Etapa
- [ ] Avaliar a performance dos bancos relacional utilizando o JMeter


### 6ª Etapa
- [ ] Apresentar os resultados obtidos nas etapas 3, 4 e 5


## Entregas

### 1ª Entrega
- [x] DR, definição de grupos de usuários e suas permissões, definição de índices e justificativas, definição de views, triggers, procedures, funções e suas justificativas, caso existam.
- [x] Print com o count das tabelas
- [x] Um vídeo mostrando a aplicação funcionando. Neste vídeo é importante
mostrar a conexão com o banco, funções que fazem a requisição dos dados da
API, funções que salvam os dados tratados no banco.

### 2ª Entrega
- [ ] Apresentação dos gráficos gerados, incluindo o público-alvo e o objetivo do mesmo.
- [ ] Resultados dos testes de performance obtidos com o JMeter
- [ ] Link para o código desenvolvido
- [ ] Apresentação que será usada pelo grupo na aula síncrona.

## Api escolhida
A API escilhida foi [TBDb Movies](https://www.themoviedb.org/documentation/api)

## Modelo relacional criado a partir dos dados disponiveis na API
<img src="/modelagem" height="500"> 

### Como utilizar

## SQL do modelo relacional
Para criar o banco de dados na sua maquina basta executar o comandos sql listados [neste documento](https://docs.google.com/document/d/1vDa5XZbt_17oftN4uM6nDnA_VS9txFs0blgwiAdhQ8A/edit). Além dos comando para criar as tabelas você pode executar os comandos que criam os indices que foram definidos para otimizar alguns tipos de consultas que podem ser realizados com um frequencia maior.

## Configurar aplicação

Depois de criar uma base de dados e usar o script disponivel na etapa anterior basta clonar este repositorio e:

1. Abrir o projeto e baixar as suas dependencais com:
```
npm install
```

2. acessar o arquivo config.json dentro da pasta app/config e mudar o valor das variaveis username, password e database como no exemplo abaixo.

**observação:** Caso você utilizo um banco de dados diferente do postgres será necessario alterar o dialect.
```
{
  "development": {
    "username": NOME_DO_SEU_USUARIO,
    "password": SUA_SENHA,
    "database": NOME_DO_SEU_BANCO,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
...
}
```


