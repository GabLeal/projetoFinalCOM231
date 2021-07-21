const {Router} = require('express')
const FilmesController = require('../controllers/FilmesController')

const router = Router()

router
    .get('/filmesComMaisAtores', FilmesController.filmesComMaisAtores)
    .get('/produtorasComMaisFilmes', FilmesController.produtorasComMaisFilmes)
    .get('/atoresComMaisAtuacoes', FilmesController.atoresComMaisAtuacoes)
    .get('/QuantidadeDeFilmesPorGenero', FilmesController.QuantidadeDeFilmesPorGenero)
    //TODO migra as rotas acima para uma rota de relatorios
    .get('/buscarTodosOsFilmes', FilmesController.buscarTodosOsFilmes)
    .get('/buscarFilmesGeneros', FilmesController.filmesGeneros)
    .get('/buscarFilmesProdutoras', FilmesController.filmesProdutoras)
    .get('/buscarFilmesAtores', FilmesController.filmesAtores)
    .get('/buscarFilmesGenerosAtores', FilmesController.buscarFilmesGenerosAtores)
    .get('/buscarFilmesProdutorasAtores', FilmesController.buscarFilmesProdutorasAtores)
    .get('/buscarFilmesGenerosProdutorasAtores', FilmesController.filmesGenerosProdutorasAtores)
    .get('/buscarFilmesGenerosProdutoras', FilmesController.filmesGenerosProdutoras)

module.exports = router