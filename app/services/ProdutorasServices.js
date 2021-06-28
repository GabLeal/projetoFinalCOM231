const Services = require("./Services");

class ProdutorasServices extends Services{
    constructor(){
        super('Produtoras')
    }
}

module.exports = new ProdutorasServices