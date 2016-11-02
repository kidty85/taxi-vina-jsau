
'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const validator = require('validator')
const path = require('path')
const cors = require('cors')
const request_logger = require('morgan')
const P = require('bluebird')

//crossed domains
app.use(cors())

//debug
app.use(request_logger('dev'));

//promesse
let fsP = P.promisify(require('fs').readFile)

let fs = require('fs')
    //let jsonfile = require('jsonfile')
    /*let obj={ id : 1234,
                name : "NGUYEN",
                firstname : "Jimmy"
              }*/
let file_path_clients = path.resolve() + '../Clients.json'
    //let text_clients = path.resolve() + '/text.txt'

let file_path_drivers = path.resolve() + '../Drivers.json'
    //let text_drivers = path.resolve() + '/textDriver.txt'
let temp = {}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.listen(3000, () => {
  console.log('listening on 3000')
})

app.route('/')
    .get((req, res) => {
        res.sendFile(path.resolve() + '../index.html')
    })

app.route('/clients')
        .get((req, res) => {

            temp = req.body
            console.log(req.body)
            let verif = validator.isEmail(temp.email)
            if(verif){
                /*fs.readFile(file_path_clients, (err, data) => {
                  if (err) {throw err}
                  let clients = JSON.parse(data).clients
                  for(let i=0; i<clients.length; i++)
                    if(clients[i].email==temp.email)
                  res.send('Affichage la fiche du client clients \n' + JSON.stringify(JSON.parse(clients[i])))
                })*/
/*		fsP.readFileAsync(file_path_clients).then(JSON.parse)
		.then(function(val) {
		    console.log(val.success)<
		})
		.catch(SyntaxError, function(err) {
		    console.error("Invalid JSON in file", err)
		})
		.catch(function(err) {
		    console.error("Unable to read file", err)
		})*/
            }
            else {
                res.sendFile(path.resolve() + '../importante.html')
            }
        })

app.route('/clients')
        .post((req, res) => {
/*             //res.send('Creation la liste des clients')
            let newClient = req.body
            let contain = JSON.parse(fs.readFile(file_path_clients))
            let arrClients = contain.clients
            for (let i = 0; i < arrClients.length; i++)
                {if (arrClients[i].id == newClient.id) {
                    res.send('client id existe déjà : ' + arrClients[i] + ' et ' + newClient.id + '\n')
                    return
                }}
                    //
            arrClients.push(newClient)
            contain.clients = arrClients

            fs.writeFile(file_path_clients, JSON.stringify(contain), (err) => {
                if (err) {throw err}

                console.log('It\'s saved!')

            })
            res.send('Creation du client : ' + '\n')*/
            temp = req.body
            let verif = validator.isEmail(temp.email)
            console.log('temp')
            if(verif){
                /*fs.readFile(file_path_clients, (err, data) => {
                  if (err) {throw err}
		  let flag = false
		  let dataReturned = {}
                  let clients = JSON.parse(data).clients
                  for(let i=0; i<clients.length; i++)
                    if(clients[i].email==temp.email){
			   console.log(clients[i])
			   dataReturned.flag=1
			   dataReturned.client=clients[i]
                           res.send(JSON.stringify(dataReturned))
			   //res.send(JSON.parse(dataReturned)
			   flag=true;
		    }
		  if(!flag){
			dataReturned.flag=-1
			dataReturned.client="aucune"
			res.send(JSON.stringify(dataReturned))
		  }
                })*/
		fsP(file_path_clients, "utf8")
		.then(JSON.parse)
		.then(function(val) {
		  let flag = false
		  let dataReturned = {}
                  let clients = val.clients
                  for(let i=0; i<clients.length; i++)
                    if(clients[i].email==temp.email){
			   console.log(clients[i])
			   dataReturned.flag=1
			   dataReturned.client=clients[i]
                           res.send(JSON.stringify(dataReturned))
			   //res.send(JSON.parse(dataReturned)
			   flag=true;
		    }
		  if(!flag){
			dataReturned.flag=0
			dataReturned.client="aucune"
			res.send(JSON.stringify(dataReturned))
		  }
		})
		.catch(SyntaxError, function(err) {
		    console.error("Invalid JSON in file", err)
		    let dataReturned = {}
		    dataReturned.flag=-1
		    dataReturned.client="JSON"
		    res.send(JSON.stringify(dataReturned))
		})
		.catch(function(err) {
		    console.error("Unable to read file", err)
		    let dataReturned = {}
		    dataReturned.flag=-2
		    dataReturned.client="fichier"
		    res.send(JSON.stringify(dataReturned))
		})
            }
            else {
                //res.sendFile(path.resolve() + '/importante.html')
		console.error("Invalid email format")
		let dataReturned = {}
		dataReturned.flag=-11
		dataReturned.client="format"
		res.send(JSON.stringify(dataReturned))
            }

        })

    /*  "/clients/:id"
     *    GET: find contact by id
     *    PUT: update contact by id
     *    DELETE: deletes contact by id
     */

    /*app.route('/clients/:id')
        .get(function(req, res) {
            res.send('Affichage la client : ' + 'id')
            });*/

app.route('/clients')
        .put((req, res) => {

            //try{
            //console.log(req.body)
            /*var input       = JSON.stringify(req.body);
            var dataToWrite = fs.readFileSync(file_path) + input
            console.log(dataToWrite)
            fs.writeFile(file_path,dataToWrite, (err) => {
                         if (err) throw err;

                         console.log('It\'s saved!');

                             });
            res.send('Mise a jour du client : ' +'\n')*/
            let newClient = req.body
            let contain = JSON.parse(fs.readFile(file_path_clients))
            let arrClients = contain.clients
            let flag = false
            for (let i = 0; i < arrClients.length; i++)
                {if (arrClients[i].id == newClient.id) {
                    arrClients[i] = newClient
                    flag = true
                    break
                }}
            if (flag == false) {
                res.send('client id n\'existe pas : ' + '\n')
            }
            //
            contain.clients = arrClients

            fs.writeFile(file_path_clients, JSON.stringify(contain), (err) => {
                if (err) {throw err}

                console.log('It\'s saved!')

            })
            res.send('Modification du client : ' + '\n')

            //}
            //catch(e){
            // console.log(e)
            //}
        })


app.route('/clients')
        .delete((req, res) => {
            let newClient = req.body
            let contain = JSON.parse(fs.readFile(file_path_clients))
            let arrClients = contain.clients
            let flag = false
            for (let i = 0; i < arrClients.length; i++)
               {if (arrClients[i].id == newClient.id) {
                   flag = true
                   arrClients.splice(i, 1)
                   break
               }}
            if (flag == false) {
                res.send('client id n\'existe pas : ' + '\n')
            }
               //
            contain.clients = arrClients

            fs.writeFile(file_path_clients, JSON.stringify(contain), (err) => {
                if (err) {throw err}

                console.log('It\'s saved!')

            })


            res.send('Suppression du clients : ' + ':id')

        })

/*
CRUD FOR DRIVER
*/

app.route('/drivers')
        .get((req, res) => {

            //var contenu = fs.readFileSync(text);
            //res.send('Affichage la liste des clients \n' + contenu);
            fs.readFile(file_path_drivers, (err, data) => {
                if (err) {throw err}
                res.send('Affichage la liste des chauffeurs \n' + JSON.stringify(JSON.parse(data).drivers))
            })
        })

app.route('/drivers')
        .post((req, res) => {
             //res.send('Creation la liste des clients')
            let newDriver = req.body
            let contain = JSON.parse(fs.readFile(file_path_drivers))
            let arrDriver = contain.drivers
            for (let i = 0; i < arrDriver.length; i++)
                {if (arrDriver[i].id == newDriver.id) {
                    res.send('driver id existe déjà : ' + '\n')
                    return
                }}
                    //
            arrDriver.push(newDriver)
            contain.drivers = arrDriver

            fs.writeFile(file_path_drivers, JSON.stringify(contain), (err) => {
                if (err) {throw err}

                console.log('It\'s saved!')

            })
            res.send('Creation du chauffeur : ' + '\n')

        })

    /*  "/driver/:id"
     *    GET: find contact by id
     *    PUT: update contact by id
     *    DELETE: deletes contact by id
     */


app.route('/drivers')
        .put((req, res) => {

            let newDriver = req.body
            let contain = JSON.parse(fs.readFile(file_path_drivers))
            let arrDriver = contain.drivers
            let flag = false
            for (let i = 0; i < arrDriver.length; i++)
                {if (arrDriver[i].id == newDriver.id) {
                    arrDriver[i] = newDriver
                    flag = true
                    break
                }}
            if (flag == false) {
                res.send('chauffeur id n\'existe pas : ' + '\n')
            }
            //
            contain.drivers = arrDriver

            fs.writeFile(file_path_drivers, JSON.stringify(contain), (err) => {
                if (err) {throw err}
                console.log('It\'s saved!')

            })
            res.send('Modification du chauffeur : ' + '\n')

            //}
            //catch(e){
            // console.log(e)
            //}
        })


app.route('/drivers')
        .delete((req, res) => {
            let newDriver = req.body
            let contain = JSON.parse(fs.readFile(file_path_drivers))
            let arrDriver = contain.drivers
            let flag = false
            for (let i = 0; i < arrDriver.length; i++)
               {if (arrDriver[i].id == newDriver.id) {
                   flag = true
                   arrDriver.splice(i, 1)
                   break
               }}
            if (flag == false) {
                res.send('chauffeur id n\'existe pas : ' + '\n')
            }
               //
            contain.drivers = arrDriver

            fs.writeFile(file_path_drivers, JSON.stringify(contain), (err) => {
                if (err) {throw err}

                console.log('It\'s saved!')

            })


            res.send('Suppression du chauffeur : ' + ':id')

        })
