const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

let port = process.env.PORT || 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (request, response) => {
  const name = request.cookies.name
  response.render('index', {name})
})

app.post('/', (request, response) => {
  const name = request.body.name
  response.cookie('name', name)
  response.render('index', {name})
})
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
