require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateToken = (payload, key = process.env.PASS_KEY) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            key, {
                expiresIn: '2h'
            }, (err, token) => {
                if (err) {
                    console.log(err)
                    reject('No se pudo generar el token')
                }

                resolve(token)
            })
    })
}

module.exports = {
    generateToken
}