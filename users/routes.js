const {Router} = require('express')
const Users = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()

router.get('/users', (req, res) => {
    Users
        .findAll()
        .then(user => {
            res.send({user})
        })
        .catch(error => next(error))
    
})


router.post('/users', (req,res,next)=> {
    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    } 
    if (!user) {
        res.status(405).send({
            message: 'Please supply a valid email & Password'
        })
    } else {
        Users.create(user)
            .then(()=>{
                res.send({
                    message: 'A new User was been created'
                })
            })
    }
})

module.exports = router