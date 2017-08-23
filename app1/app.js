const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let port = process.env.PORT || 3000
app.use(bodyParser)

app.get('/', (request, response) => {
  response.send('Hello')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
