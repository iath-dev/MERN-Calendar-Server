require('dotenv').config()
const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const validateToken = (req = request, res = response, next = function(){}) => {
    const { headers: { authorization } } = req

    if (!authorization) {
        return res.status(401).json({
            ok: false,
            msg: 'Acceso denegado'
        })
    }

    // console.log({ authorization })

    try {
        const { uid, name } = jwt.verify(authorization, process.env.PASS_KEY)

        req.auth = { uid, name }
    } catch (error) {
        // console.error(error)
        return res.status(401).json({
            ok: false,
            msg: 'Acceso denegado'
        })
    }

    next()
}

module.exports = validateToken