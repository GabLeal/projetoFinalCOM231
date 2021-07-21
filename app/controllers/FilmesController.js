const dataBase = require('../models')

const { FilmesServices, AtuacoesServices } = require('../services')
class FilmesController{

    async filmesGeneros(req, res){
        try {
            const {valor,atributo,order, generoFilme, limit, nota, dataPesquisa} = req.query;
            const resultado = await FilmesServices.filmesGeneros(valor,atributo[0], order,generoFilme, limit, nota, dataPesquisa)
            
            return res.json(resultado)

        } catch (error) {
            console.log('Erro ao buscar todos os filmes')
            console.log(error)
        }
    }

    async filmesAtores(req, res){
        try {
            const {valor,atributo, order, nomeAtor, limit} = req.query
            const resultado = await FilmesServices.filmesAtores(valor,atributo[0], order,'', limit)
            
            return res.json(resultado)

        } catch (error) {
            console.log('Erro ao buscar todos os filmes')
            console.log(error)
        }
    }

    async filmesProdutoras(req, res){
        try {
            const {valor, atributo, order, nomeProdutora, limit} = req.query
            const resultado = await FilmesServices.filmesProdutoras(valor, atributo[0], order, nomeProdutora, limit)
            
            return res.json(resultado)

        } catch (error) {
            console.log('Erro ao buscar todos os filmes')
            console.log(error)
        }
    }

    async filmesGenerosProdutoras(req, res){
        try {
            const {valor,atributo,order, generoFilme, nomeProdutora, limit} = req.query;
            console.log(nomeProdutora)
            const resultado = await FilmesServices.filmesGenerosProdutoras(valor, atributo[0], order, generoFilme, nomeProdutora, limit)
            
            return res.json(resultado)

        } catch (error) {
            console.log('Erro ao buscar todos os filmes')
            console.log(error)
        }
    }

    async buscarFilmesGenerosAtores(req, res){
        try {
            const {valor,atributo,order, generoFilme, limit, nota, dataPesquisa} = req.query;
            const resultado = await FilmesServices.buscarFilmesGenerosAtores(valor, atributo[0], order, generoFilme, '', limit)
            
            return res.json(resultado)

        } catch (error) {
            console.log('Erro ao buscar todos os filmes')
            console.log(error)
        }
    }

    async buscarFilmesProdutorasAtores(req, res){
        try {
            const {valor,atributo,order, generoFilme, limit, nota, dataPesquisa} = req.query;
            const resultado = await FilmesServices.buscarFilmesProdutorasAtores(valor, atributo[0], order, generoFilme, '', limit)
            
            return res.json(resultado)

        } catch (error) {
            console.log('Erro ao buscar todos os filmes')
            console.log(error)
        }
    }

    async filmesGenerosProdutorasAtores(req, res){
        try {
            const {valor,atributo,order, generoFilme, nomeProdutora, limit} = req.query;
            const resultado = await FilmesServices.filmesGenerosProdutorasAtores(valor, atributo[0], order, generoFilme, nomeProdutora, limit)
            
            return res.json(resultado)

        } catch (error) {
            console.log('Erro ao buscar todos os filmes')
            console.log(error)
        }
    }

    async buscarTodosOsFilmes(req, res){
        try {
            const {valor,atributo, order, limit} = req.query
            const resultado = await FilmesServices.buscarTodos(valor,atributo[0], order, limit)
            
            return res.json(resultado)

        } catch (error) {
            console.log('Erro ao buscar todos os filmes')
            console.log(error)
        }
    }


    async filmesComMaisAtores(req, res){
        try {
            const resultado = await FilmesServices.filmesComMaisAtores()
            
            return res.json(resultado)

        } catch (error) {
            console.log('Erro ao buscar filmes com mais atores')
            console.log(error)
        }
    }

    async produtorasComMaisFilmes(req, res){
        try {
            const resultado = await FilmesServices.produtorasComMaisFilmes()
            
            return res.json(resultado)

        } catch (error) {
            console.log('Erro ao buscar filmes com mais atores')
            console.log(error)
        }
    }

    async atoresComMaisAtuacoes(req, res){
        try {
            const resultado = await FilmesServices.atoresComMaisAtuacoes()
            
            return res.json(resultado)

        } catch (error) {
            console.log('Erro ao buscar filmes com mais atores')
            console.log(error)
        }
    }

    async QuantidadeDeFilmesPorGenero(req, res){
        try {
            const resultado = await FilmesServices.QuantidadeDeFilmesPorGenero()
            
            return res.json(resultado)

        } catch (error) {
            console.log('Erro ao buscar filmes com mais atores')
            console.log(error)
        }
    }

    /// acima são coisas novas 2 entrega

    async cadastrarFilme(filme){
        try {
            const resultado = await FilmesServices.criar(filme)
       
            
            var filme = resultado.get({ plain: true});
            if(resultado){
                console.log("\x1b[32m", `Filmes de id ${filme.idfilme} criado com sucesso`)

                console.log(filme.descricao)
            }

        } catch (error) {
            console.log("\x1b[31m", `ERRO ao criar FILME de id ${filme.idfilme}.`)
            console.log(error)
        }
    }

    async associarGeneroAoFilme(idfilme, generos){
        try {
         
            for (const item of generos) {
                const resultado = await dataBase.FilmesGeneros.create({idfilme: idfilme, idgenero:item.id})
            
                var filme = resultado.get({ plain: true});
                if(resultado){
                    console.log("\x1b[32m", `associação de idfilme ${idfilme} com idgenero ${item.id}criado com sucesso`)
    
                    console.log(filme)
                }
            }

        } catch (error) {
            console.log("\x1b[31m", `ERRO ao criar associacao`)
            console.log(error)
        }
    }

    async associarProdutoraAoFilme(idfilme, produtoras){
        try {
         
            for (const idprodutora of produtoras) {
                const resultado = await dataBase.FilmesProdutoras.create({idfilme: idfilme, idprodutora:idprodutora})
            
                var filme = resultado.get({ plain: true});
                if(resultado){
                    console.log("\x1b[32m", `associação de idfilme ${idfilme} com idprodutora ${idprodutora} criado com sucesso`)
    
                    console.log(filme)
                }
            }

        } catch (error) {
            console.log("\x1b[31m", `ERRO ao criar associacao`)
            console.log(error)
        }
    }

    async associarAtoresAoFilme(idfilme, atores){
        try {
         
            for (const idator of atores) {
                const resultado = await dataBase.Atuacoes.create({idfilme: idfilme, idator:idator})
            
                var filme = resultado.get({ plain: true});
                if(resultado){
                    console.log("\x1b[32m", `associação de idfilme ${idfilme} com idgenero ${idator}criado com sucesso`)
    
                    console.log(filme)
                }
            }

        } catch (error) {
            console.log("\x1b[31m", `ERRO ao criar associacao`)
            console.log(error)
        }
    }
    
}

module.exports = new FilmesController