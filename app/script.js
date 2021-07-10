const axios = require('axios')

const GeneroController = require('./controllers/GeneroController')
const ProdutorasController = require('./controllers/ProdutorasController')
const AtoresController = require('./controllers/AtoresController')
const FilmesController = require('./controllers/FilmesController')

const dataBase = require('./models')

const headers = {
  'Content-Type': 'application/json', 
  'Authorization': 'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTYwODM1ZTQ4MDMyNjgzOTY0Nzc2OWIxZjBhZWU5MSIsInN1YiI6IjYwYjNlZjQ3NjhiMWVhMDAzZmI2YjNkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VQnn5lyagyPy5gZV68D8xjtLjvgnW4XikXZxPB5JEfQ'
}

const idAtoresCadastrados = []
const idProdutorasCadastrados = []

async function buscarGeneros(){
  try {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {headers : headers})
    const generos = response.data['genres']

    for (const item of generos){

      await GeneroController.cadastrarGenero({idgenero: item.id, nome: item.name})
    }

  } catch (error) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> Erro ao buscar generos <<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    console.log(erro)
  }
}

async function buscarProdutoras(produtoras){
  try {
    console.log('--------- Produtoras----------')
    const produtorasDoFilme = []

    for (const item of produtoras) {

      if(!idProdutorasCadastrados.includes(item.id)){
        const response = await axios.get(`https://api.themoviedb.org/3/company/${item.id}`, {headers: headers})
        const produtora = response.data

        ProdutorasController.cadastrarProdutora({
          idprodutora :produtora.id, 
          nome: produtora.name, 
          localizacao: produtora.origin_country
        })

        idProdutorasCadastrados.push(item.id)
      }else{
        console.log('"\x1b[33m"',`PRODUTORA jde id ${item.id} já foi cadastrada`)
      }

      produtorasDoFilme.push(item.id)
    }

    return produtorasDoFilme

  } catch (error) {
    console.log(`>>>>>>>>>>>>>>>>>>>>>>>> Erro ao buscar produtora de ID ${id} <<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
    console.log(erro)
  }
  
}

async function buscarPessoa(id){
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/person/${id}`, {headers: headers})
    
    const pessoa = response.data

    ator = {
      idator: pessoa.id,
      nome : pessoa.name,
      bibliografia: pessoa.biography,
      aniversario: pessoa.birthday,
      area: pessoa.place_of_birth,
      popularidade: pessoa.popularity
    }
   
    await AtoresController.cadastrarAtores(ator)

    idAtoresCadastrados.push(id)

  } catch (error) {
    console.log(`>>>>>>>>>>>>>>>>>>>>>>>> Erro ao buscar Pessoa ID ${id} <<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
    console.log(erro)
  }
}


async function buscaCreditosFilme(id){

  const atores = []

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {headers: headers})
    const elenco = response.data['cast']
    console.log('--------- ATORES ----------')
    
    for (const item of elenco) {

      if(item.known_for_department === 'Acting' ){
        if(!idAtoresCadastrados.includes(item.id)){
        
         await buscarPessoa(item.id)
  
        }else{
          console.log(`>>>>>>>>>>>>>>>>>>>>>>>> ATOR jÁ FOI CADASTRADO <<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        }

        atores.push(item.id)
      }
    }

    return atores

  } catch (error) {
    console.log(`>>>>>>>>>>>>>>>>>>>>>>>> Erro ao cadastrar ATOR de ID ${id} <<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
    console.log(erro)
  }
}


async function associarGenerosAoFilme(idfilme,generos){
  try {

    for (const item of generos) {
      const status = await dataBase.FilmesGeneros.create({
        idfilme: idfilme,
        idgenero: item.id
      })

      if(status){
        console.log("ASSOCIAÇÃO CRIADA COM O GENERO DE ID: "+item.id)
      }
    }

    
  } catch (error) {
    console.log('Erro ao fazer associação')
  }
}


async function buscarInfoUmFilme(id){

  try{
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`,{
      headers: headers
    });
    
    const filme = response.data

      const produtoras = await buscarProdutoras(filme.production_companies)

      const atores =  await buscaCreditosFilme(id)



      movie = {
        idfilme: filme.id,
        nome: filme.original_title,
        descricao: filme.overview,
        datalancamento:filme.release_date,
        duracao: filme.runtime,
        linguagemoriginal: filme.original_language,
        orcamento: filme.budget,
        nota: filme.vote_average
      }

      
      await FilmesController.cadastrarFilme(movie)

      const generos = filme.genres

      await FilmesController.associarGeneroAoFilme(filme.id, generos)
      await FilmesController.associarProdutoraAoFilme(filme.id, produtoras)
      await FilmesController.associarAtoresAoFilme(filme.id, atores)

      //TODO
      //depois de percorrer as outras funções, todas as tabelas sem relaões vao estar populadas
      //nesse ponto devo cadastrar o filme
     

  }catch(erro){
    console.log(`>>>>>>>>>>>>>>>>>>>>>>>> Erro ao buscar filme de ID ${id} <<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
    console.log(erro)
  }

}

async function buscarFilmes(initNumeroPagina,maximoPaginasRequisitadas){

  try{
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?page=${initNumeroPagina}`,{
      headers: headers
    });

    const filmes = response.data['results']

    for (const item of filmes) {
      await buscarInfoUmFilme(item.id)
    
    }

    if(initNumeroPagina != maximoPaginasRequisitadas){
      initNumeroPagina++
      
      await buscarFilmes(initNumeroPagina, maximoPaginasRequisitadas)
    }

    console.log(`produtoras cadastradas ${idProdutorasCadastrados.length}`)
    
  }catch(erro){
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> Erro ao buscar todos os filmes <<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    console.log(erro)
    
  }

}

buscarGeneros()
buscarFilmes(1,1)