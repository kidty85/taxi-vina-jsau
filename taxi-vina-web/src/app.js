'use strict'
const express = require('express')
const proxy = require('express-http-proxy');
const app = express()
const path = require('path');
const request_logger = require('morgan');

app.listen(3001, () => {
  console.log('listening on 3001')
})

//debug
app.use(request_logger('dev'));

//APIs
app.use('/api', proxy('http://localhost:3000'))

app.use('/resource', express.static(path.join(__dirname, 'resource')))
app.use('/resource/js', express.static(path.join(__dirname, 'resource/js')))
app.use('/resource/css', express.static(path.join(__dirname, 'resource/css')))
app.use('/resource/img', express.static(path.join(__dirname, 'resource/img')))

app.route('/')
    .get((req, res) => {
        res.sendFile(path.resolve() + '/src/resource/index.html')
    })

app.route('/clients')
	.get((req, res) => {
        res.sendFile(path.resolve() + '/src/resource/clients.html')
    })

