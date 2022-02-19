const http = require('http');
const displayedContent = require('')

const server = http.createServer(displayedContent)

server.listen(3001)
