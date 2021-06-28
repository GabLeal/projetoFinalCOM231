const { ProdutorasServices } = require('../services')

class ProdutorasController{

    async cadastrarProdutora(produtora){
        try {
            const resultado = await ProdutorasServices.criar(produtora)
            if(resultado){
                console.log("\x1b[32m", `Produtora de id ${produtora.idprodutora} criado com sucesso`)
            }

        } catch (error) {
            console.log("\x1b[31m", `ERRO ao criar produtora de id ${produtora.idprodutora}.`)
            console.log(error)
        }
    }

}

module.exports = new ProdutorasController