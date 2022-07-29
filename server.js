
const express  = require('express')
const app = (express())


app.set( 'view engine', 'ejs' )
app.set( 'views', './src/views')

app.use( express.json() )
app.use( express.urlencoded( {extended: true }))

app.use( '/api/productos', require('./src/routes/routeProducts') )
app.use( '/api/carritos', require( './src/routes/routeCart') )
app.use( '/', require( './src/routes/routeAdmin'))




const Port = process.env.PORT ||  8080
app.listen( Port, console.log(`Servidor funcionando en el puerto ${Port}`))
