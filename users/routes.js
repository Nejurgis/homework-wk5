const {Router} = require('express')
const Users = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()

router.get('/users', (req, res, next) => {
    Users
        .findAll()
        .then(user => {
            res.send({user})
        })
        .catch(error => next(error))
    
})

module.exports = router
// router.post('/users', (req,res,next)=> {
//     const user = {
//         email: req.body.email,
//         password: bcrypt.hashSync(req.body.password, 10),
//     }
// })