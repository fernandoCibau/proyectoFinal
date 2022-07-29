

const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get( '/', ( req, res ) => {
    res.render( 'admin')
})

router.post( '/admin', ( req, res ) => {
    fs.promises.readFile( 'usuarios.txt')
        .then( answer => {
            const listUsers = JSON.parse( answer )
            const newUser =   req.body 
            const user = listUsers.filter( e => e.user = newUser.user )
            res.render( 'formProduct')
            fs.promises.writeFile( 'usuarios.txt', JSON.stringify( user, null, 4) )
        })

})

module.exports = router