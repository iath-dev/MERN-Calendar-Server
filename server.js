require('dotenv').config()
const express = require('express')

const dbConnection = require('./db/config')

// Crear el servidor de express
const app = express()

// Base de Datos
dbConnection()

// Lectura y parse del body
/**
 * Lectura y parse del Body
 * NOTE: Tener cuidado con el orden de los procesos. 
 */
app.use(express.json())

// Directorio publico
app.use(express.static('public'))

// Rutas
// TODO Auth: crear, login, renew
app.use('/api/auth', require('./routes/auth'))
// TODO CRUD: Eventos

// Escuchar las peticiones
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT)
})
