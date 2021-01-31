require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const dbConnection = process.env.DB_CONNECTION.replace('<password>', process.env.DB_PASSWORD);

mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, () => {
    console.log('DB connection established successfully');
})

const port = process.env.PORT || '8080';

app.set('port', port);

const server = http.createServer(app);

server.listen(port);

server.on('listening', () => {
    console.log('App is listening on port: ' + port);
});

server.on('error', (e) => {
    console.log(`Error: ${e.message}`);
});