const database = require('../models')
const { Op } = require("sequelize");

class Services{
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async criar(valor){
        return database[this.nomeDoModelo].create(valor)
    }

    async buscarTodos(valor,atributo, order, limit = 10){ 
        return database[this.nomeDoModelo].findAll(
        {
            
            attributes: atributo,
            limit: limit,
            order: [
               [`${order}`, 'DESC'],
            ],
            where: {
                nome:{
                    [Op.iLike]: `${valor}%`
                },
                // nota:{
                //     [Op.gte]: 10
                // },
                //  orcamento:{
                //    [Op.gt] : 10
                // }
            
                
            }
        }
        )
    }
}

module.exports = Services