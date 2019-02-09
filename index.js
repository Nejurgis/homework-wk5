const express = require('express')
const app = express()


app.listen(4001, () => console.log('ExpressSSSS 4001'))

app.get('/users', (request, response) => {
    console.log(`TEST!`)
    response.end()
})