const { Router } = require('express')
const Playlist = require('./model')
const User = require('../users/model')
const auth =  require('../auth/middleware')
const {toData} = require('../auth/jwt')

const router = new Router()

router.post('/playlists', auth, (req, res, next) => {
    const name = req.body.name
    if(!name) {
      res.status(400).send({
        message: `Please supply a Playlist name and description(optional)`
      })
    } else {
        Playlist
          .create(req.body)
          .then(playlist => {
            if (!playlist) {
              return res.status(404).send({
                message: `Playlist does not exist`
              })
            }
            return res.status(201).send(playlist)
          })
          .catch(error => next(error))
    }
})

router.get('/playlists', auth, (req, res, next) => {
  const limit = req.query.limit || 25
  const offset = req.query.offset || 0
  
  
  Promise.all([
    Playlist.count(),
    Playlist.findAll({ limit, offset })
  ])
    .then(([total, playlists]) => {
      res.send({
        playlists, total
      })
    })
    .catch(error => next(error))
})

// router.get('/customers/:id', (req, res, next) => {
//   Customer
//     .findById(req.params.id, { include: [Company] })
//     .then(customer => {
//       if (!customer) {
//         return res.status(404).send({
//           message: `Customer does not exist`
//         })
//       }
//       return res.send(customer)
//     })
//     .catch(error => next(error))
// })



// router.put('/customers/:id', (req, res, next) => {
//   Customer
//     .findById(req.params.id)
//     .then(customer => {
//       if (!customer) {
//         return res.status(404).send({
//           message: `Customer does not exist`
//         })
//       }
//       return customer.update(req.body).then(customer => res.send(customer))
//     })
//     .catch(error => next(error))
// })

// router.delete('/customers/:id', (req, res, next) => {
//   Customer
//     .findById(req.params.id)
//     .then(customer => {
//       if (!customer) {
//         return res.status(404).send({
//           message: `Customer does not exist`
//         })
//       }
//       return customer.destroy()
//         .then(() => res.send({
//           message: `Customer was deleted`
//         }))
//     })
//     .catch(error => next(error))
// })

module.exports = router