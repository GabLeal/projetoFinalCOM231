const Services = require("./Services");
const database = require('../models')
const { Op } = require("sequelize")

class AtoresServices extends Services{
    constructor(){
        super('Atores')
    }

    async buscarTodosOsAtores(nomeAtor, popularidade, atributo, order, limit){ 

        if(!popularidade){
            popularidade = 0
        }
        console.log(popularidade)
        return database.Atores.findAll(
        {
            
            attributes: atributo,
            limit: limit,
            order: [
               [`${order}`, 'DESC'],
            ],
            where: {
                nome:{
                    [Op.iLike]: `${nomeAtor}%`
                },
                popularidade: {
                    [Op.gt] : popularidade
                }
                
            }
        }
        )
    }
    
}

module.exports = new AtoresServices