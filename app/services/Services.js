const database = require('../models')
const { Op } = require("sequelize");

class Services{
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async criar(valor){
        return database[this.nomeDoModelo].create(valor)
    }

    async buscarTodos(valor,atributo, order){
        return database[this.nomeDoModelo].findAll(
        {
            
            attributes: atributo,
            limit: 10,
            order: [
               [`${order}`, 'DESC'],
            ],
            where: {
                nome:{
                     [Op.iLike]: `${valor}%`
                 }
            }
        }
        )
    }
}

module.exports = Services