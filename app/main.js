
const FilmesController = require('./controllers/FilmesController')
const Atores = require('./controllers/AtoresController')


const express = require('express')
const app = express()

app.use('/scripts', express.static(__dirname + '/view/src/js'));
app.use('/css', express.static(__dirname + '/view/src/css'));

app.get('/', async (req, res)=>{
  // const filmes = await FilmesController.buscarTodosOsFilmes()
  // const atores = await Atores.buscarTodosOsAtores()
  const filmes = await FilmesController.filmesComMaisAtores()
  
  return res.sendFile(__dirname + "/view/index.html")
})

app.get('/filmesComMaisAtores', async (req, res)=>{

  const filmes = await FilmesController.filmesComMaisAtores()
  
   return res.json(filmes)
  
})

app.get('/buscarTodosOsFilmes', async (req, res)=>{

  const {valor,atributo,order} = req.query;

  const filmes = await FilmesController.buscarTodosOsFilmes(valor,atributo,order)
  
  return res.json(filmes)
  
 
})

app.listen('3241')