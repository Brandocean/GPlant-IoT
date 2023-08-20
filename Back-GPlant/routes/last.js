let express = require('express')
let mysql = require('mysql')
let router = express.Router();

let config = require('../helpers/config')

let conexion = mysql.createConnection(config)

// SELECT * FROM Lecture ORDER BY lectureNo DESC LIMIT 1
router.get('/', (request, response, next) => {
    let sql = 'SELECT * FROM Lecture ORDER BY lectureNo DESC LIMIT 1'
    conexion.query(sql, (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    })
}) 


module.exports = router