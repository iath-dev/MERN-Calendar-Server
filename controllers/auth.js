require('dotenv').config()
const { request, response } = require('express')
const bcrypt = require('bcryptjs')

const { generateToken } = require('../helpers/jwt')
const User = require('../models/User')

const signup = async (req = request, res = response) => {
    try {
        const { body } = req
    
        const { email, password } = body

        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Ups, el correo ya se encuentra en uso'
            })
        }
        
        user = new User(body)

        // Cifrar la contraseña
        const slat = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, slat)
    
        await user.save()

        // Generar JWT
        const token = await generateToken({
            name: user.name,
            uid: user.id
        })

        res.status(201).json({
            ok: true,
            name: user.name,
            uid: user.id,
            token
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            ok: false,
            errors: 'Ups, no se pudo crear el usuario'
        })
    }

}

const login = async (req, res = response) => {
    try {
        const { body: { email, password } } = req

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Error, usuario y contraseña no validos'
            })
        }

        const $password = bcrypt.compareSync(password, user.password)

        if (!$password) {
            return res.status(400).json({
                ok: false,
                msg: 'Error, usuario y contraseña no valido'
            })
        }

        // Generar JWT
        const token = await generateToken({
            name: user.name,
            uid: user.id
        })

        res.status(201).json({
            ok: true,
            name: user.name,
            uid: user.id,
            token
        })
    
    } catch (error) {
        console.error(error)

        res.status(500).json({
            ok: false,
            errors: 'Ups, no se pudo crear el usuario'
        })
    }
}

const renew = async (req = request, res = response) => {

    try {
        const { uid, name } = req
    
        const token = await generateToken({ uid, name })
    
        res.status(201).json({
            ok: true,
            uid,
            name,
            token
        })
        
    } catch (error) {
        console.error(error)

        res.status(500).json({
            ok: false,
            errors: 'Ups, no se pudo crear el usuario'
        })
    }
}

module.exports = {
    signup,
    login,
    renew
}
