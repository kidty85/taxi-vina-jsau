
'use strict'
const express = require('express')
const app = express()
const path = require('path');

app.listen(3001, () => {
  console.log('listening on 3001')
})

app.use('/resource', express.static(path.join(__dirname, 'resource')));
app.use('/resource/js', express.static(path.join(__dirname, 'resource/js')));
app.use('/resource/css', express.static(path.join(__dirname, 'resource/css')));
app.use('/resource/img', express.static(path.join(__dirname, 'resource/img')));

app.route('/')
    .get((req, res) => {
        res.sendFile(path.resolve() + '/index.html')
    })

app.route('/clients')
	.get((req, res) => {
        res.sendFile(path.resolve() + '/clients.html')
    })
