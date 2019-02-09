const { Router } = require('express')
const {toJWT, toData} = require('./jwt')
const User = require('../users/model')
const router = new Router()
const bcrypt = require('bcrypt')
const auth =  

router.post('/tokens', (req,res) => {
    const email = req.body.email;
    const password = req.body.password
    if(!email || !password) {
        res.status(400).send({
            message: `Please supply a valid email and password`
        })
    } else {
        
    }
})

module.exports = router