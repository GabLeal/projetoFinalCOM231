const { AtoresServices } = require('../services')

class AtoresController{

    async cadastrarAtores(ator){
        try {
            const resultado = await AtoresServices.criar(ator)
            if(resultado){
                console.log("\x1b[32m", `Atores de id ${ator.idator} criado com sucesso`)
            }

        } catch (error) {
            console.log("\x1b[31m", `ERRO ao criar ator de id ${ator.idator}.`)
            console.log(error)
        }
    }

}

module.exports = new AtoresController