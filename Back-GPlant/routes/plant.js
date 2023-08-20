let express = require('express')
let mysql = require('mysql')
let router = express.Router();

let config = require('../helpers/config')

let conexion = mysql.createConnection(config)

//GETTERS
router.get('/', (request, response, next) => {
    let sql = 'SELECT * FROM Plant'
    conexion.query(sql, (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    })
})

router.get('/:plantNo', (request, response, next) =>{
    let sql = 'SELECT * FROM Plant WHERE plantNo = ?';
    conexion.query(sql, [request.params.plantNo], (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    })
})

//POST
router.post('/', (request, response, next) =>{
    let plant = request.body 
    let sql = 'INSERT INTO Plant(plantNo, type) VALUES(?,?)';
    conexion.query(sql, [plant.plantNo, plant.type], (error, results, fields) => {
        if(error)
            response.send(error)
        response.json(results)
    })
})


//PUT
router.put('/', (request, response, next) => {
    let plant = request.body
    if(plant.plantNo && plant.type){
        let sql = `UPDATE Plant SET type = ? WHERE plantNo = ?`
        conexion.query(sql, [plant.type, plant.plantNo], (error, results, fields) => {
            if(error)
                response.send(error)
            response.json(results)
        })
    }else{
        response.json({error: 'Faltan parametros'})
    }
})

//DELETE
router.delete('/:plantNo', (request, response, next) => {
    let sql = 'DELETE FROM Plant WHERE plantNo = ?'
    conexion.query(sql, [request.params.plantNo], (error, results, fields) => {
        if(error)
            response.send(error)
        response.json(results)
    })
})


module.exports = router