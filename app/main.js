const AtoresController = require('./controllers/AtoresController')


const express = require('express')
const routes = require('./routes')

const app = express()
routes(app)
app.use('/scripts', express.static(__dirname + '/view/src/js'));
app.use('/css', express.static(__dirname + '/view/src/css'));
app.use('/images', express.static(__dirname + '/view/src/img'));

app.get('/', async (req, res)=>{  
    return res.sendFile(__dirname + "/view/index.html")
})

app.listen('3242')


module.exports = app