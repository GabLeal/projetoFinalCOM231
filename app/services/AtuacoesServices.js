const Services = require("./Services");

class AtuacoesServices extends Services{
    constructor(){
        super('Atuacoes')
    }
}

module.exports = new AtuacoesServices