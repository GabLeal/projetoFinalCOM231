const Services = require("./Services");

class FilmesServices extends Services{
    constructor(){
        super('Filmes')
    }
}

module.exports = new FilmesServices