let express = require('express')

// Ruteador se encarga de dirigir las peticiones del cliente (navegador)
// a las funciones especificadas
let router = express.Router();

router.get('/', (request, response, next) => {
    response.send('Bienvenido al login de la G-Plant')
})

module.exports = router