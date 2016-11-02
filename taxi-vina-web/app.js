
'use strict'
const express = require('express')
const proxy = require('express-http-proxy');
const app = express()
const path = require('path');

app.listen(3001, () => {
  console.log('listening on 3001')
})

app.use('/src/resource', express.static(path.join(__dirname, 'src/resource')))
app.use('/src/resource/js', express.static(path.join(__dirname, 'src/resource/js')))
app.use('/src/resource/css', express.static(path.join(__dirname, 'src/resource/css')))
app.use('/src/resource/img', express.static(path.join(__dirname, 'src/resource/img')))

app.route('/')
    .get((req, res) => {
        res.sendFile(path.resolve() + '/src/resource/index.html')
    })

app.route('/clients')
	.get((req, res) => {
        res.sendFile(path.resolve() + '/src/resource/clients.html')
    })

//APIs
app.use('/api/clients', proxy('http://localhost:3000/clients'))
