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
      res.sendFile(path.resolve() + '/src/resource/html/index.html')
  })

app.route('/client')
	.get((req, res) => {
      res.sendFile(path.resolve() + '/src/resource/html/client.html')
  })

app.route('/driver')
	.get((req, res) => {
      res.sendFile(path.resolve() + '/src/resource/html/driver.html')
  })

app.route('/booking')
	.get((req, res) => {
      res.sendFile(path.resolve() + '/src/resource/html/booking.html')
  })

app.route('/bookingAdmin')
	.get((req, res) => {
      res.sendFile(path.resolve() + '/src/resource/html/bookingAdmin.html')
  })
