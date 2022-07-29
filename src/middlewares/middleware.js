
const fs = require('fs')

const validarAdministrador = (req, res, next) => {
    fs.promises.readFile( 'usuarios.txt', 'utf-8')
        .then( answer =>{
            const listUser = JSON.parse( answer )
            const objUser = listUser.find( e => e.user)
            if( objUser.user === "true" ){
                next()
            }else{
                res.json('No autorizado, Solo Administradores ')
            }
        })

}

module.exports = validarAdministrador