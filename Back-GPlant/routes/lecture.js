let express = require('express')
let mysql = require('mysql')
let router = express.Router();

let config = require('../helpers/config')

let conexion = mysql.createConnection(config)

//GETTER General
router.get('/', (request, response, next) => {
    let sql = 'SELECT * FROM Lecture'
    conexion.query(sql, (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    })
}) ;

//GETTER POR LectureNo
router.get('/:lectureNo', (request, response, next) =>{
    let sql = 'SELECT * FROM Lecture WHERE lectureNo = ?';
    conexion.query(sql, [request.params.lectureNo], 
        (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    })
})

//POST
router.post('/', (request, response, next) =>{
    let lecture = request.body 
    let sql = `INSERT INTO Lecture(plantNo, dia, hora, 
        humedad, temp_int, humedad_out, luz_solar) 
        VALUES(?,now(),now(),?,?,?,?)`;
    conexion.query(sql, [lecture.plantNo, lecture.humedad, 
        lecture.temp_int, lecture.humedad_out, lecture.luz_solar], 
        (error, results, fields) => {
        if(error)
            response.send(error)
        response.json(results)
    })
})


//PUT
router.put('/', (request, response, next) => {
    let lecture = request.body
    if(lecture.lectureNo && lecture.plantNo && lecture.dia && lecture.hora 
        && lecture.humedad && lecture.temp_int && lecture.humedad_out && lecture.luz_solar){
        let sql = `UPDATE Lecture SET plantNo = ?, dia = ?, hora = ?, 
        humedad = ?, temp_int = ?, temp_out = ?, luz_solar = ? WHERE lectureNo = ?`
        conexion.query(sql, [lecture.plantNo, lecture.dia, lecture.hora, 
            lecture.humedad, lecture.temp_int, lecture.humedad_out, 
            lecture.luz_solar, lecture.lectureNo], (error, results, fields) => {
            if(error)
                response.send(error)
            response.json(results)
        })
    }else{
        response.json({error: 'Faltan parametros'})
    }
})

//DELETE
router.delete('/:lectureNo', (request, response, next) => {
    let sql = 'DELETE FROM Lecture WHERE lectureNo = ?'
    conexion.query(sql, [request.params.lectureNo], (error, results, fields) => {
        if(error)
            response.send(error)
        response.json(results)
    })
})

module.exports = router

