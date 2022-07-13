const http = require('http');
const app = require('./app');
app.set('port', 4200)
const server = http.createServer(app);
server.listen(4200)