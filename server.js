
const express  = require('express')
const app = (express())


app.use( express.json() )
app.use( express.static('public'))


app.use( '/api/productos', require('./src/routes/routeProducts') )
app.use( '/api/carrito', require( './src/routes/routeCart') )


const Port = process.env.PORT ||  8080
app.listen( Port, console.log(`Servidor funcionando en el puerto ${Port}`))
