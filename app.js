const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const onHeaders = require('on-headers')

let port = process.env.PORT || 3000
const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.use((request, response, next) => {
  request.session = request.cookies.sessionCookie
  onHeaders(response, () => {
    response.cookie('sessionCookie', request.session)
  })
  next()
})

app.get('/', (request, response) => {
  response.render('index', request.session)
})

app.post('/', (request, response) => {
  request.session = request.body
  response.render('index', request.session)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
