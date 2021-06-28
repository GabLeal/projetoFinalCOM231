const Services = require("./Services");

class GeneroServices extends Services{
    constructor(){
        super('Generos')
    }
}

module.exports = new GeneroServices