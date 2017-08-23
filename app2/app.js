const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

let port = process.env.PORT || 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (request, response) => {
  const userInfo = request.cookies.userInfo
  response.render('index', userInfo)
})

app.post('/', (request, response) => {
  const userInfo = request.body
  response.cookie('userInfo', userInfo)
  response.render('index', userInfo)
})
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
