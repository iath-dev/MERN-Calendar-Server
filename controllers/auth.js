const { request, response } = require('express')

const signup = (req = request, res = response) => {
    const { body: { name, email, password } } = req

    res.status(201).json({
        ok: true,
        name,
        email,
        password
    })
}

const login = (req, res = response) => {    
    const { body: { email, password } } = req

    res.status(201).json({
        ok: true,
        email,
        password
    })
}

const renew = (req = request, res = response) => {
    res.status(201).json({
        ok: true,
        msg: 'Renew'
    })
}

module.exports = {
    signup,
    login,
    renew
}
