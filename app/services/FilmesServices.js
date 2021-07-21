const Services = require("./Services");
const database = require('../models')
const { Op, Sequelize } = require("sequelize");


class FilmesServices extends Services{
    constructor(){
        super('Filmes')
    }

    async filmesGeneros(valor, atributo, order,generoFilme, limit, nota, dataPesquisa){
        if(nota === '' || nota === null){
            nota = 0;
        }

        return await database.Filmes.findAll({
            attributes: atributo,
            order: [
                [`${order}`, 'DESC'],
             ],
             where: {
                 nome:{
                     [Op.iLike]: `${valor}%`
                 },
                 nota:{
                     [Op.gte]: nota
                 },
                 datalancamento :{
                    [Op.between]: [dataPesquisa.dataInicial, dataPesquisa.dataFinal],
                 }
             },
            include: [
                {
                    model : database.Generos,
                    
                    attributes : ['nome'],
                    where:{
                        nome:{
                            [Op.iLike]: `${generoFilme}%`
                        },
                    }
                  
                },
            ]
            
           , limit:limit})
    }

    async filmesProdutoras(valor, atributo, order,nomeProdutora,limit){
        return await database.Filmes.findAll({
            attributes: atributo,
            order: [
                [`${order}`, 'DESC'],
             ],
            where: {
                nome:{
                    [Op.iLike]: `${valor}%`
                },
                
            },
            include: [   
                {
                    model : database.Produtoras,
                    attributes : ['nome'],
                    where:{
                        nome:{
                            [Op.iLike]: `${nomeProdutora}%`
                        },
                    }
                  
                } 
            ]
            
           , limit:limit,})
    }

    async filmesGenerosProdutoras(valor, atributo, order, generoFilme, nomeProdutora, limit){
        return await database.Filmes.findAll({
            attributes: atributo,
            order: [
                [`${order}`, 'DESC'],
            ],
            where: {
                nome:{
                    [Op.iLike]: `${valor}%`
                },
            },
            include: [   
                {
                    model : database.Generos,
                    attributes : ['nome'],
                    where:{
                        nome:{
                            [Op.iLike]: `${generoFilme}%`
                        },
                    }
                  
                },
                {
                    model : database.Produtoras,
                    attributes : ['nome'],
                    where:{
                        nome:{
                            [Op.iLike]: `${nomeProdutora}%`
                        },
                    }
                  
                } 
            ]
            
           , limit:limit,})
    }

    async buscarFilmesGenerosAtores(valor, atributo, order, generoFilme, nomeProdutora, limit){
        return await database.Filmes.findAll({
            attributes: atributo,
            order: [
                [`${order}`, 'DESC'],
            ],
            where: {
                nome:{
                    [Op.iLike]: `${valor}%`
                },
            },
            include: [   
                {
                    model : database.Generos,
                    attributes : ['nome'],
                    where:{
                        nome:{
                            [Op.iLike]: `${generoFilme}%`
                        },
                    }
                  
                },
                {
                    model : database.Atores
                 
                } 
            ]
            
           , limit:limit,})
    }

    async buscarFilmesProdutorasAtores(valor, atributo, order, generoFilme, nomeProdutora, limit){
        return await database.Filmes.findAll({
            attributes: atributo,
            order: [
                [`${order}`, 'DESC'],
            ],
            where: {
                nome:{
                    [Op.iLike]: `${valor}%`
                },
            },
            include: [   
                {
                    model : database.Produtoras,
                    attributes : ['nome'],
                    where:{
                        nome:{
                            [Op.iLike]: `${generoFilme}%`
                        },
                    }
                  
                },
                {
                    model : database.Atores
                 
                } 
            ]
            
           , limit:limit,})
    }

    async buscarFilmesProdutorasGenerosAtores(valor, atributo, order, generoFilme, nomeProdutora, limit){
        return await database.Filmes.findAll({
            attributes: atributo,
            order: [
                [`${order}`, 'DESC'],
            ],
            where: {
                nome:{
                    [Op.iLike]: `${valor}%`
                },
            },
            include: [   
                {
                    model : database.Produtoras,
                    attributes : ['nome'],
                    where:{
                        nome:{
                            [Op.iLike]: `${generoFilme}%`
                        },
                    }
                  
                },
                {
                    model : database.Atores
                 
                } 
            ]
            
           , limit:limit,})
    }


    async filmesGenerosProdutorasAtores(valor, atributo, order, generoFilme, nomeProdutora, limit){
        return await database.Filmes.findAll({
            attributes: atributo,
            order: [
                [`${order}`, 'DESC'],
            ],
            where: {
                nome:{
                    [Op.iLike]: `${valor}%`
                },
            },
            include: [   
                {
                    model : database.Produtoras,
                    attributes : ['nome'],
                    where:{
                        nome:{
                            [Op.iLike]: `${generoFilme}%`
                        },
                    }
                  
                },
                {
                    model : database.Generos,
                    attributes : ['nome'],
                    where:{
                        nome:{
                            [Op.iLike]: `${generoFilme}%`
                        },
                    }
                  
                },
                {
                    model : database.Atores
                 
                } 
            ]
            
           , limit:limit,})
    }

    async filmesAtores(valor, atributo, order, nomeAtor, limit){
        return await database.Filmes.findAll({
            attributes: atributo,
            order: [
                [`${order}`, 'DESC'],
             ],
            where: {
                nome:{
                    [Op.iLike]: `${valor}%`
                },
                
            },
            include: [   
                {
                    model : database.Atores,
                    attributes : ['nome'],
                    where:{
                        nome:{
                            [Op.iLike]: `${nomeAtor}%`
                        },
                    }
                  
                } 
            ]
            
           , limit:limit})
    }

    async atoresComMaisAtuacoes(){

        return await database.sequelize.query(`
        select atores.nome, COUNT(DISTINCT(filmes.idfilme)) as "quantidade" from atuacoes 
        INNER JOIN filmes on atuacoes.idfilme = filmes.idfilme
        INNER JOIN atores on atuacoes.idator = atores.idator
        GROUP BY 1 ORDER BY quantidade DESC
        LIMIT 20
        `, { type: database.sequelize.QueryTypes.SELECT }).then((result)=>{
 
             var padraoGrafico = new Map()
             var filmes = []
             var qauntidadeAtores = []
 
             result.forEach((i)=>{
                 filmes.push(i.nome)
                 qauntidadeAtores.push(i.quantidade)
 
                 padraoGrafico.set('filmes', filmes);
                 padraoGrafico.set('qauntidadeAtores', qauntidadeAtores);
                
             })
 
         return {
             "filmes" : filmes,
             "quantidadeAtores": qauntidadeAtores
         }
        });
        
    }

    
    async produtorasComMaisFilmes(){

        return await database.sequelize.query(`
        select produtoras.nome, COUNT(DISTINCT(filmes.idfilme)) as "quantidade" from filmesprodutoras 
        INNER JOIN filmes on filmesprodutoras.idfilme = filmes.idfilme
        INNER JOIN produtoras on filmesprodutoras.idprodutora = produtoras.idprodutora
        GROUP BY 1 ORDER BY quantidade DESC
        LIMIT 20
        `, { type: database.sequelize.QueryTypes.SELECT }).then((result)=>{
 
             var padraoGrafico = new Map()
             var filmes = []
             var qauntidadeAtores = []
 
             result.forEach((i)=>{
                 filmes.push(i.nome)
                 qauntidadeAtores.push(i.quantidade)
 
                 padraoGrafico.set('filmes', filmes);
                 padraoGrafico.set('qauntidadeAtores', qauntidadeAtores);
                
             })
 
         return {
             "filmes" : filmes,
             "quantidadeAtores": qauntidadeAtores
         }
        });
        
    }

    async filmesComMaisAtores(){

       return await database.sequelize.query(`
        select filmes.nome, count(distinct(atores.idator)) AS "quantidade" from atuacoes 
        INNER JOIN filmes on atuacoes.idfilme = filmes.idfilme
        INNER JOIN atores on atuacoes.idator = atores.idator  
        GROUP BY 1 
        ORDER BY quantidade DESC
        LIMIT 10
       `, { type: database.sequelize.QueryTypes.SELECT }).then((result)=>{

            var padraoGrafico = new Map()
            var filmes = []
            var qauntidadeAtores = []

            result.forEach((i)=>{
                filmes.push(i.nome)
                qauntidadeAtores.push(i.quantidade)

                padraoGrafico.set('filmes', filmes);
                padraoGrafico.set('qauntidadeAtores', qauntidadeAtores);
               
            })

        return {
            "filmes" : filmes,
            "quantidadeAtores": qauntidadeAtores
        }
       });
       
    }

    async QuantidadeDeFilmesPorGenero(){

        return await database.sequelize.query(`
        select generos.nome, COUNT(DISTINCT(filmes.idfilme)) as "quantidade" from filmesgeneros 
        INNER JOIN filmes on filmesgeneros.idfilme = filmes.idfilme
        INNER JOIN generos on filmesgeneros.idgenero = generos.idgenero
        GROUP BY 1
        ORDER BY quantidade DESC
        `, { type: database.sequelize.QueryTypes.SELECT }).then((result)=>{
 
             var padraoGrafico = new Map()
             var filmes = []
             var qauntidadeAtores = []
 
             result.forEach((i)=>{
                 filmes.push(i.nome)
                 qauntidadeAtores.push(i.quantidade)
 
                 padraoGrafico.set('filmes', filmes);
                 padraoGrafico.set('qauntidadeAtores', qauntidadeAtores);
                
             })
 
             return {
                "filmes" : filmes,
                "quantidadeAtores": qauntidadeAtores
            }
        });
        
     }
    
}

module.exports = new FilmesServices