const bodyParser = require('body-parser')
const filmes = require('./filmesRouter')
const atores = require('./atoresRouter')
module.exports = app =>{
    
    app.use(bodyParser.json())

    app.use(filmes, atores)
}