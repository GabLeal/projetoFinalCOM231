const database = require('../models')

class Services{
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async criar(valor){
        return database[this.nomeDoModelo].create(valor)
    }
}

module.exports = Services