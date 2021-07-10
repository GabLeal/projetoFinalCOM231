const Services = require("./Services");
const database = require('../models')
const { Op, Sequelize } = require("sequelize");


class FilmesServices extends Services{
    constructor(){
        super('Filmes')
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
       
       database.Atuacoes.findAll({
            //attributes: ['filmes.nome', Sequelize.fn('COUNT', Sequelize.col('atores.idator'))],
            attributes: [
                'Filmes.nome',
                [Sequelize.literal('COUNT(DISTINCT(Atores.idator))'), 'teste']
              ],
            include: [
                {
                    model: database.Atores,
                    attributes: [],
                    required: true
                 
                },
                {
                    model: database.Filmes,
                    attributes: [],
                    required: true
                 
                }
            ],
            group: '"Filmes.nome"',
        })
        return database.Atuacoes.findAll(
            {
                limit: 10,
                
                include: [
                    {
                        model: database.Filmes,
                        required: true,
                        attributes:['nome']
                    },
                    {
                        model: database.Atores,
                        required: true,
                        attributes:['nome', 'popularidade']
                    }
                ]
             
                // attributes: ['nome', 'popularidade'],
            
                // order: [
                // ['popularidade', 'DESC'],
                // ],
                // where: {
                //     nome:{
                //         [Op.iLike]: 'Daniel h%'
                //     }
                // }
            }
        )
    }
    
}

module.exports = new FilmesServices