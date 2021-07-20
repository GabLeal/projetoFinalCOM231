
const FilmesController = require('./controllers/FilmesController')
const Atores = require('./controllers/AtoresController')


const express = require('express')
const app = express()

app.use('/scripts', express.static(__dirname + '/view/src/js'));
app.use('/css', express.static(__dirname + '/view/src/css'));

app.get('/', async (req, res)=>{
  const filmes = await FilmesController.filmesComMaisAtores()
  
  return res.sendFile(__dirname + "/view/index.html")
})

app.get('/filmesGeneros', async (req, res)=>{
  // const filmes = await FilmesController.buscarTodosOsFilmes()
  // const atores = await Atores.buscarTodosOsAtores()
  const filmes = await FilmesController.filmesGeneros()
  
  return res.json(filmes)
})

app.get('/filmesComMaisAtores', async (req, res)=>{

  const filmes = await FilmesController.filmesComMaisAtores()
  
   return res.json(filmes)
  
})

app.get('/produtorasComMaisFilmes', async (req, res)=>{

  const filmes = await FilmesController.produtorasComMaisFilmes()
  
   return res.json(filmes)
  
})

app.get('/atoresComMaisAtuacoes', async (req, res)=>{

  const filmes = await FilmesController.atoresComMaisAtuacoes()
  
   return res.json(filmes)
  
})



app.get('/QuantidadeDeFilmesPorGenero', async (req, res)=>{

  const filmes = await FilmesController.QuantidadeDeFilmesPorGenero()
  
   return res.json(filmes)
  
})

app.get('/buscarTodosOsFilmes', async (req, res)=>{
 
  const {valor, atributo, order, limit} = req.query;
  console.log(atributo[0])

  const filmes = await FilmesController.buscarTodosOsFilmes(valor,atributo[0],order, limit)
  
  return res.json(filmes)
  
})

app.get('/buscarFilmesGeneros', async (req, res)=>{
 
  const {valor,atributo,order, generoFilme, limit, nota, dataPesquisa} = req.query;

  const filmes = await FilmesController.filmesGeneros(valor,atributo[0],order,generoFilme, limit, nota, dataPesquisa)
  
  return res.json(filmes)
  
})

app.get('/buscarFilmesProdutoras', async (req, res)=>{
 
  const {valor,atributo,order, nomeProdutora, limit} = req.query;

  const filmes = await FilmesController.filmesProdutoras(valor,atributo[0],order,nomeProdutora, limit)
  
  return res.json(filmes)
  
})

app.get('/buscarFilmesAtores', async (req, res)=>{
 
  const {valor,atributo,order, limit} = req.query;
  const filmes = await FilmesController.filmesAtores(valor,atributo[0],order,'', limit)
  
  return res.json(filmes)
  
})


app.get('/buscarFilmesGenerosProdutoras', async (req, res)=>{
 
  const {valor,atributo,order, generoFilme, nomeProdutora, limit} = req.query;

  const filmes = await FilmesController.filmesGenerosProdutoras(valor,atributo[0],order,generoFilme, nomeProdutora, limit )
  
  return res.json(filmes)
  
})

app.listen('3242')