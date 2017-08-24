const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const onHeaders = require('on-headers')
const Cryptr = require('cryptr')
const config = require('./config.json')
const cryptr = new Cryptr(config.encryptionKey)

const app = express()

let port = process.env.PORT || 3000


app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended: true})) // what does true mean?
app.use(cookieParser())

app.use((request, response, next) => {
  request.session = decryptSession(request.cookies.sessionCookie)
  onHeaders(response, () => {
    const secureCookie = encryptSession(request.session)
    response.cookie('sessionCookie', secureCookie)
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

//should put these functions in a seperate file and require them.
let encryptSession = (session) => {
  if(!session){
    session = {}
  }
  return cryptr.encrypt(JSON.stringify(session))
}

let decryptSession = (secretKey) => {
  if (typeof secretKey === 'undefined'){
    return {}
  }
  return JSON.parse(cryptr.decrypt(secretKey))
}
