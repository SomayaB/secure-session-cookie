const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', './views') //what does this line do?
app.set('view engine', 'pug')

app.get('/', (request, response) => {
  response.send('Hello World')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
