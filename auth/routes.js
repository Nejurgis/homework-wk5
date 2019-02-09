const { Router } = require('express')
const {toJWT, toData} = require('./jwt')
const User = require('../users/model')
const router = new Router()
const bcrypt = require('bcrypt')
const auth =  

router.get('/users', (req,res,next) => {
 
})