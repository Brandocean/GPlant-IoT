let express = require('express')
let mysql = require('mysql')
let router = express.Router();

let config = require('../helpers/config')

let conexion = mysql.createConnection(config)

//GETTERS
router.get('/', (request, response, next) => {
    let sql = 'SELECT * FROM Branch'
    conexion.query(sql, (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    })
})

router.get('/:branchNo', (request, response, next) =>{
    let sql = 'SELECT * FROM Branch WHERE branchNo = ?';
    conexion.query(sql, [request.params.branchNo], (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    })
})

//getters
router.get('/', (request, response, next) => {
    let sql = 'SELECT * FROM Branch'
    conexion.query(sql, (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    })
}) 
router.get('/:branchNo', (request, response, next) =>{
    let sql = 'SELECT * FROM Branch WHERE branchNo = ?';
    conexion.query(sql, [request.params.branchNo], (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    })
})
//post
router.post('/', (request, response, next) =>{
    let branch = request.body 
    let sql = 'INSERT INTO Branch(branchNo, street, city, postcode) VALUES(?,?,?,?)';
    conexion.query(sql, [branch.branchNo, branch.street, branch.city, branch.postcode], (error, results, fields) => {
        if(error)
            response.send(error)
        response.json(results)
    })
})

//put
router.put('/', (request, response, next) => {
    let branch = request.body
    if(branch.branchNo && branch.street && branch.city && branch.postcode){
        let sql = `UPDATE Branch SET street = ?, city = ?, postcode = ? WHERE branchNo = ?`
        conexion.query(sql, [branch.street, branch.city, branch.postcode, branch.branchNo], (error, results, fields) => {
            if(error)
                response.send(error)
            response.json(results)
        })
    }else{
        response.json({error: 'Faltan parametros'})
    }
})

//delete
router.delete('/:branchNo', (request, response, next) => {
    let sql = 'DELETE FROM Branch WHERE branchNo = ?'
    conexion.query(sql, [request.params.branchNo], (error, results, fields) => {
        if(error)
            response.send(error)
        response.json(results)
    })
})
module.exports = router