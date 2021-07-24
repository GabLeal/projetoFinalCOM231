const {Router} = require('express')
const AtoresController = require('../controllers/AtoresController')

const router = Router()

router
    .get('/buscarAtores',AtoresController.buscarTodosOsAtores)


module.exports = router