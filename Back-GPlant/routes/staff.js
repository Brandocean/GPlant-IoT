let express = require('express')
let mysql = require('mysql')
let router = express.Router();

let config = require('../helpers/config')

let conexion = mysql.createConnection(config)

//GETTERS
router.get('/', (request, response, next) => {
    let sql = 'SELECT * FROM Staff'
    conexion.query(sql, (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    })
})

router.get('/:staffNo', (request, response, next) =>{
    let sql = 'SELECT * FROM Staff WHERE staffNo = ?';
    conexion.query(sql, [request.params.staffNo], (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    })
})

//POST
router.post('/', (request, response, next) =>{
    let staff = request.body 
    let sql = 'INSERT INTO Staff(staffNo, fName, lName, position, sex, salary, branchNo) VALUES(?,?,?,?,?,?,?)';
    conexion.query(sql, [staff.staffNo, staff.fName, staff.lName, staff.position, staff.sex, staff.salary, staff.branchNo], (error, results, fields) => {
        if(error)
            response.send(error)
        response.json(results)
    })
})


//PUT
router.put('/', (request, response, next) => {
    let staff = request.body
    if(staff.staffNo && staff.fName && staff.lName && staff.position && staff.sex && staff.salary && staff.branchNo){
        let sql = `UPDATE Staff SET fName = ?, lName = ?, position = ?, sex = ?, salary = ?, branchNo = ? WHERE staffNo = ?`
        conexion.query(sql, [staff.fName, staff.lName, staff.position, staff.sex, staff.salary, staff.branchNo, staff.staffNo], (error, results, fields) => {
            if(error)
                response.send(error)
            response.json(results)
        })
    }else{
        response.json({error: 'Faltan parametros'})
    }
})

//DELETE
router.delete('/:staffNo', (request, response, next) => {
    let sql = 'DELETE FROM Staff WHERE staffNo = ?'
    conexion.query(sql, [request.params.staffNo], (error, results, fields) => {
        if(error)
            response.send(error)
        response.json(results)
    })
})

module.exports = router