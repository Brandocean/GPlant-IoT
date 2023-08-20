let express = require('express') // no es necesario poner express.js, con solo el nombre lo entiende
let cors = require('cors')
let app = express()
let port = process.env.PORT || 3000

// process.env.DBHOST
// process.env.DBUSER

app.use(express.json())
app.use(cors())

let index = require('./routes/index')
let lecture = require('./routes/lecture')
let plant = require('./routes/plant')
let client = require('./routes/client')
let branch = require('./routes/branch')
let staff = require('./routes/staff')
let registration = require('./routes/registration')
let last = require('./routes/last')

app.use('/', index)
app.use('/lecture', lecture) 
app.use('/plant', plant)
app.use('/client', client)
app.use('/branch', branch)
app.use('/staff', staff)
app.use('/registration', registration)
app.use('/last', last)

app.listen(port, () => {
    // Interpolacion de cadenas o Strings literals
    console.log(`Servidor iniciado en el puerto ${port}`)
})