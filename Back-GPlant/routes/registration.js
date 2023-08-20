let express = require('express')
let mysql = require('mysql')
let router = express.Router();

let config = require('../helpers/config')

let conexion = mysql.createConnection(config)

//GETTERS
router.get('/', (request, response, next) => {
    let sql = 'SELECT * FROM Registration'
    conexion.query(sql, (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    })
})

router.get('/:registrationNo', (request, response, next) =>{
    let sql = 'SELECT * FROM Registration WHERE registrationNo = ?';
    conexion.query(sql, [request.params.registrationNo], (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    })
})

//POST
router.post('/', (request, response, next) =>{
    let registration = request.body 
    let sql = 'INSERT INTO Registration(registrationNo, clientNo, branchNo, staffNo, plantNo, dateShopping) VALUES(?,?,?,?,?,?)';
    conexion.query(sql, [registration.registrationNo, registration.clientNo, registration.branchNo, registration.staffNo, registration.plantNo, registration.dateShopping], (error, results, fields) => {
        if(error)
            response.send(error)
        response.json(results)
    })
})

//PUT
router.put('/', (request, response, next) => {
    let registration = request.body
    if(registration.registrationNo && registration.clientNo && registration.branchNo && registration.staffNo && registration.plantNo && registration.dateShopping){
        let sql = `UPDATE Registration SET clientNo = ?, branchNo = ?, staffNo = ?, plantNo = ?, dateShopping= ? WHERE registrationNo = ?`
        conexion.query(sql, [registration.clientNo, registration.branchNo, registration.staffNo, registration.plantNo, registration.dateShopping, registration.registrationNo], (error, results, fields) => {
            if(error)
                response.send(error)
            response.json(results)
        })
    }else{
        response.json({error: 'Faltan parametros'})
    }
})

//DELETE
router.delete('/:registrationNo', (request, response, next) => {
    let sql = 'DELETE FROM Registration WHERE registrationNo = ?'
    conexion.query(sql, [request.params.registrationNo], (error, results, fields) => {
        if(error)
            response.send(error)
        response.json(results)
    })
})

module.exports = router