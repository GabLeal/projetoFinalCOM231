const { AtuacoesServices } = require('../services')

class AtuacoesController{

    async cadastrarAtuacoes(atuacao){
        try {
            const resultado = await AtuacoesServices.criar(atuacao)
            if(resultado){
                console.log("\x1b[32m", `Atuação criado com sucesso`)
            }

        } catch (error) {
            console.log("\x1b[31m", `ERRO ao criar atuação`)
            console.log(error)
        }
    }

}

module.exports = new AtuacoesController