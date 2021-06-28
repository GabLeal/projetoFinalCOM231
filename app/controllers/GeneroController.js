const dataBase = require('../models')

const { GeneroServices } = require('../services')
class GeneroController{

    async cadastrarGenero(genero){
        try {
            const resultado = await GeneroServices.criar(genero)
            if(resultado){
                console.log("\x1b[32m", `Genero de id ${genero.idgenero} criado com sucesso`)
            }

        } catch (error) {
            console.log("\x1b[31m", `ERRO ao criar genero de id ${genero.idgenero}.`)
            console.log(error)
        }
    }

    async buscarTodosGenero(){
        try {
            const generos = await dataBase.Generos.findAll()
            console.log(generos)
        } catch (error) {
            console.log(error)
        }
    }


}

module.exports = new GeneroController