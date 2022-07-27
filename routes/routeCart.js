

const express = require('express')
const router = express.Router()
const fs = require('fs')
const validarAdministrador = require('../middlewares/middleware')


router.get('/:id/productos', (req, res) => {
    fs.promises.readFile( 'carritos.txt')
    .then( answer => {
        const listCart = JSON.parse( answer )
        const idCart = req.params.id
        const carId = listCart.find( e => e.idCarrito == idCart)
        res.json(carId)
    })
})

router.post('/', (req, res) => {
    fs.promises.readFile( 'carritos.txt')
        .then( answer =>{
            const list = JSON.parse(answer)
            const id = list.length
            const newId = id + 1
            const timeStamp = Date()
            list.push( { "idCarrito": newId, "diaYHora" : timeStamp, "productos": [] } )
            console.log( timeStamp)
            fs.promises.writeFile('carritos.txt', JSON.stringify(list, null, 4))
            res.send('Nuevo carrito en lista')
        })
})

router.post( '/:id/productos', ( req, res ) => {
    fs.promises.readFile( 'products.txt')
    .then( answer =>{
        const listProducts = JSON.parse( answer )
        const productBody = req.body.id
        const productSelect = listProducts.find( e => e.id == productBody)

        fs.promises.readFile( 'carritos.txt')
        .then( result =>{
            const listCart = JSON.parse( result )
            const idCart = req.params.id
            const cart = listCart.find( e => e.idCarrito == idCart )
            cart.productos.push( productSelect )
            const newCart = listCart.filter( e => e.idCarrito != idCart)
            newCart.push( cart )
            const ListOrdinate =  newCart.sort( (a,b)=>{ return a.idCarrito - b.idCarrito } )
            res.json(ListOrdinate)
            fs.promises.writeFile( 'carritos.txt', JSON.stringify( ListOrdinate, null, 4 ))
        })
    })
})

router.delete( '/:id', ( req, res ) => {
    fs.promises.readFile( 'carritos.txt')
    .then( answer => {
        const listCart = JSON.parse( answer )
        const idCart = req.params.id
        const cartDelete = listCart.filter( e => e.idCarrito != idCart )
        let contador = 1
        const newListCart = cartDelete.filter( e => e.idCarrito = contador++)
        res.json(newListCart)
        fs.promises.writeFile( 'carritos.txt', JSON.stringify( newListCart, null, 4))
    })
})

router.delete( '/:id/productos/:id_prod', ( req, res ) => {
    fs.promises.readFile( 'carritos.txt')
    .then( answer =>{
        const listCart = JSON.parse( answer )
        const idCart = req.params.id
        const cartSelect = listCart.find( e => e.idCarrito == idCart )
        const idProducto = req.params.id_prod
        const productDelete = cartSelect.productos.filter(e => e.id != idProducto )
        cartSelect.productos = productDelete
        res.json(listCart)
        fs.promises.writeFile( 'carritos.txt', JSON.stringify( listCart, null,))
    })
})





module.exports = router 

