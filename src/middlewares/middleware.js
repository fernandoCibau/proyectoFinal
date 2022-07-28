

const validarAdministrador = (req, res, next) => {
    if( req.headers.admin === "true" ){
        next()
    }else{
        res.json('No autorizado, Solo Administradores ')
    }
}

module.exports = validarAdministrador