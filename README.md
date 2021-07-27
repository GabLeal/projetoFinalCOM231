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

## Api escolhida
A API escilhida foi [TBDb Movies](https://www.themoviedb.org/documentation/api)

## Requisitos e especificações do projeto 
[Sistema de consulta de Filmes](https://drive.google.com/file/d/1kYpMbuwATFkAQMcYmtrLSOMJhgJVf2OY/view?usp=sharing)

## Modelo relacional criado a partir dos dados disponiveis na API
<img src="/modelagem" height="500"> 

## Testes com Jmiter
Para acessar os dados referentes aos teste com o software Jmiter basta clicar aqui: [relatório Jmiter](https://drive.google.com/file/d/125N7WXN9VRa9A_H4ypjtRUKmoDcj_hoh/view?usp=sharing)

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


