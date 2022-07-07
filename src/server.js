const express = require('express')
const app = express()
const rutas = require('./routes/index')
const puerto = 8080     


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api', rutas)

const error404= (req, res,next)=>{
    let mensajeError={
        error : "-2",
        descripcion: `ruta: ${req.url} método: ${req.method} no implementado`
    }
    res.status(404).json( mensajeError)
    next()
} 
app.use(error404)




const server = app.listen(puerto, (err) => {
    if(err) {
        console.log(`Se produjo un error al iniciar el servidor: ${err}`)
    } else {
        console.log(`Servidor escuchando puerto: ${puerto}`)
    }
})