const dataBase = require('../models')

const { FilmesServices, AtuacoesServices } = require('../services')
class FilmesController{

    async filmesGeneros(valor,atributo, order,generoFilme, limit,nota, dataPesquisa){
        try {
            const resultado = await FilmesServices.filmesGeneros(valor,atributo, order,generoFilme, limit, nota, dataPesquisa)
            
            return resultado

        } catch (error) {
            console.log('Erro ao buscar todos os filmes')
            console.log(error)
        }
    }

    async filmesAtores(valor,atributo, order, nomeAtor, limit){
        try {
            const resultado = await FilmesServices.filmesAtores(valor,atributo, order,nomeAtor, limit)
            
            return resultado

        } catch (error) {
            console.log('Erro ao buscar todos os filmes')
            console.log(error)
        }
    }

    async filmesProdutoras(valor, atributo, order, nomeProdutora, limit){
        try {
            const resultado = await FilmesServices.filmesProdutoras(valor, atributo, order, nomeProdutora, limit)
            
            return resultado

        } catch (error) {
            console.log('Erro ao buscar todos os filmes')
            console.log(error)
        }
    }

    async filmesGenerosProdutoras(valor,atributo, order,generoFilme, nomeProdutora, limit){
        try {
            const resultado = await FilmesServices.filmesGenerosProdutoras(valor, atributo, order, generoFilme, nomeProdutora, limit)
            
            return resultado

        } catch (error) {
            console.log('Erro ao buscar todos os filmes')
            console.log(error)
        }
    }


    async buscarTodosOsFilmes(valor,atributo, order, limit){
        try {
            const resultado = await FilmesServices.buscarTodos(valor,atributo, order, limit)
            
            return resultado

        } catch (error) {
            console.log('Erro ao buscar todos os filmes')
            console.log(error)
        }
    }


    async filmesComMaisAtores(){
        try {
            const resultado = await FilmesServices.filmesComMaisAtores()
            
            return resultado

        } catch (error) {
            console.log('Erro ao buscar filmes com mais atores')
            console.log(error)
        }
    }

    async produtorasComMaisFilmes(){
        try {
            const resultado = await FilmesServices.produtorasComMaisFilmes()
            
            return resultado

        } catch (error) {
            console.log('Erro ao buscar filmes com mais atores')
            console.log(error)
        }
    }

    async atoresComMaisAtuacoes(){
        try {
            const resultado = await FilmesServices.atoresComMaisAtuacoes()
            
            return resultado

        } catch (error) {
            console.log('Erro ao buscar filmes com mais atores')
            console.log(error)
        }
    }

    async QuantidadeDeFilmesPorGenero(){
        try {
            const resultado = await FilmesServices.QuantidadeDeFilmesPorGenero()
            
            return resultado

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