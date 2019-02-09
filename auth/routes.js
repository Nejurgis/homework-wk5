const { Router } = require('express')
const {toJWT, toData} = require('./jwt')
const User = require('../users/model')
const router = new Router()
const bcrypt = require('bcrypt')
const auth =  require('./middleware')

router.post('/tokens', (req,res) => {
    const email = req.body.email;
    const password = req.body.password
    if(!email || !password) {
        res.status(400).send({
            message: `Please supply a valid email and password`
        })
    } else {
        User
        .findOne({
            where: {
                email: req.body.email
            }
        })
        .then(entity => {
            if(!entity) {
                res.status(400).send({
                    message: "User with that email adress doesnt exist"
                })
            }
            if(bcrypt.compareSync(req.body.password, entity.password)) {
                res.send({
                    token: toJWT({userID: entity.id}),
                })
            }
            else {
                res.status(400).send({
                    message: `Log-in details were incorrect!`
                })
            }
        })
        .catch(err=>{
            console.err
            res.status(500).send({
                message: 'Something went wrong'
            })
        })
    }
})

// added a secret endpoint route for the JWT authorization
// since in the HW requirements it wasnt specified where to send the Authorization header :p
// MiddleWare c
router.get('/secret-endpoint', auth, (req, res) => {
    res.send({
        message: `Thanks for visiting the secret endpoint ${req.user.email}.`
    })
})



module.exports = router

