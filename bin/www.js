const http = require('http')

const PORT = 8000
const serverHandle = require('../app')

const serve = http.createServer(serverHandle)
serve.listen(PORT)