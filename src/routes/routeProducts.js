

const express = require('express')
const router = express.Router()
const fs = require('fs')
const { send } = require('process')
const validarAdministrador = require('../middlewares/middleware')

const path = require('path')

router.use( express.static('public'))


router.get( '/:id', (req, res) => {
    fs.promises.readFile( 'products.txt')
        .then( answer =>{
            const pJson = JSON.parse(answer)
            const id  = req.params.id
            const product =pJson.find( e => e.id == id)
            const list = id>0? product : pJson
            // res.send( list )
            res.sendFile( path.resolve( __dirname, '../public/otra.html'))
        }).catch(error => res.json(error))
})

router.post('/agregar', validarAdministrador, (req, res) => {
    fs.promises.readFile( 'products.txt', 'utf-8')
        .then( answer => {
            const productsJson = JSON.parse(answer)
            let contador = 1
            let productosConId = productsJson.filter( e => e.id = contador++)
            const newProduct = req.body
            newProduct.id = contador++ 
            productosConId.push( newProduct )
            res.json( productosConId )
            console.log(productosConId)
            fs.promises.writeFile('products.txt', JSON.stringify(productosConId, null, 4) )
        }).catch(error => res.json(error))

})

router.put( '/cambiar', validarAdministrador, (req, res) => {
    fs.promises.readFile( 'products.txt', 'utf-8')
        .then( answer => {
            const productJson = JSON.parse( answer )
            const newProduct = req.body
            const product = productJson.filter( e => e.id != newProduct.id )
            product.push( newProduct )
            const newList =  product.sort( (a,b)=>{ return a.id - b.id } )
            res.json( newList )
            fs.promises.writeFile( 'products.txt', JSON.stringify( newList, null, 4))
        }).catch(error => res.json(error))
})

router.delete( '/:id', validarAdministrador, (req, res) => {
    fs.promises.readFile( 'products.txt') 
        .then( answer => {
            const listProducts = JSON.parse( answer )
            const idSelect = req.params.id
            const newList = listProducts.filter( e => e.id != idSelect )
            let contador = 1
            newList.forEach( e => e.id = contador++);
            res.json(newList)
            fs.promises.writeFile( 'products.txt', JSON.stringify( newList, null, 4 ))
        }).catch(error => res.json(error))
})



module.exports = router