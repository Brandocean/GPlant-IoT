let express = require('express')
let mysql = require('mysql')
let router = express.Router();

let config = require('../helpers/config')

let conexion = mysql.createConnection(config)

//GETTERS
router.get('/', (request, response, next) => {
    let sql = 'SELECT * FROM Client'
    conexion.query(sql, (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    })
})
router.get('/:clientNo', (request, response, next) =>{
    let sql = 'SELECT * FROM Client WHERE clientNo = ?';
    conexion.query(sql, [request.params.clientNo], (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    })
})

//POST
router.post('/', (request, response, next) =>{
    let client = request.body 
    let sql = 'INSERT INTO Client(clientNo, fName, lName, sex, telNo) VALUES(?,?,?,?,?)';
    conexion.query(sql, [client.clientNo, client.fName, client.lName, client.sex, client.telNo], (error, results, fields) => {
        if(error)
            response.send(error)
        response.json(results)
    })
})

//PUT
router.put('/', (request, response, next) => {
    let client = request.body
    if(client.clientNo && client.fName && client.lName && client.sex && client.telNo){
        let sql = `UPDATE Client SET fName = ?, lName = ?, sex = ?, telNo = ? WHERE clientNo=?`
        conexion.query(sql, [client.fName, client.lName, client.sex, client.telNo, client.clientNo], (error, results, fields) => {
            if(error)
                response.send(error)
            response.json(results)
        })
    }else{
        response.json({error: 'Faltan parametros'})
    }
})

//DELETE
router.delete('/:clientNo', (request, response, next) => {
    let sql = 'DELETE FROM Client WHERE clientNo = ?'
    conexion.query(sql, [request.params.clientNo], (error, results, fields) => {
        if(error)
            response.send(error)
        response.json(results)
    })
})
module.exports = router