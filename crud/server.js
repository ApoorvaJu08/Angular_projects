const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const http = require('http');
const cors = require('cors');
const api = require('./server/routes/api')

const port = 3000

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api', api)

app.get('*',(req, res) => {
  res.sendFile(path.join(__dirname, 'dist/crud/index.html'))
})

const server = http.createServer(app)
server.listen(port, function(){
  console.log("Server running on localhost:" + port)
})
