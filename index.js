const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('./users/routes')

const app = express()
const port = process.env.PORT || 4000

app
    .use(bodyParser.json())
    .use(usersRouter)
    .listen(port, ()=> console.log(`Listening on port ${port} `))


// app.listen(4001, () => console.log('ExpressSSSS 4001'))

// app.get('/users', (request, response) => {
//     console.log(`TEST!`)
//     response.end()
// })