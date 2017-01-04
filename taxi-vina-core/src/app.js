
'use strict'
const express		= require('express')
const app		= express()
const bodyParser	= require('body-parser')
const validator		= require('validator')
const path		= require('path')
const request_logger	= require('morgan')
const P			= require('bluebird')

//debug
app.use(request_logger('dev'));

//promesse
let fsP			= P.promisify(require('fs').readFile)
let fs			= require('fs')
let file_path_clients	= path.resolve() + '/Clients.json'
let file_path_drivers	= path.resolve() + '/Drivers.json'
let file_path_bookings	= path.resolve() + '/Bookings.json'

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
            let temp = {}
            temp = req.body
            console.log(req.body)
            let verif = validator.isEmail(temp.email)
            if(verif){
            }
            else {
                res.sendFile(path.resolve() + '../importante.html')
            }
        })

app.route('/clients')
        .post((req, res) => {
            let temp = {}
            temp = req.body
            if(validator.isEmail(temp.email)){
              let clients = []
          		fsP(file_path_clients, "utf8")
          		.then(JSON.parse)
          		.then(function(val) {
                clients = val.clients
                console.log(clients)
                if(!clients)
                  clients = []
                if(temp.function=="login"){
                  console.log('login')
                  let flag = false
            		  let dataReturned = {}
                  for(let i=0; i<clients.length; i++){
                    console.log(clients[i])
                    if(clients[i].email==temp.email && clients[i].password==temp.password ){
              			   dataReturned.flag=1
              			   dataReturned.client=clients[i]
                       res.send(JSON.stringify(dataReturned))
              			   flag=true
                       return
              			}
/*              			else{
                       console.log("Invalid")
              			   dataReturned.flag=-404
              			   dataReturned.error="invalid"
              			   res.send(JSON.stringify(dataReturned))
              			   flag=true
              			}*/
                  }
            		  if(!flag){
              			dataReturned.flag=0
              			dataReturned.error="aucune"
              			res.send(JSON.stringify(dataReturned))
            		  }
                }
                else if(temp.function=="signup"){
                  console.log('signup')
                  let clientToSave        = {}
                  clientToSave.email      = temp.email
                  clientToSave.password   = temp.password
                  clientToSave.Firstname  = temp.Firstname
                  clientToSave.Lastname   = temp.Lastname
                  clientToSave.id         = 0
                  for(let i=0; i<clients.length; i++)
                    if(clients[i].id > clientToSave.id)
                      clientToSave.id     = clients[i].id + 0
                  clientToSave.id++
                  clients.push(clientToSave)
                  let dataToSave   = {}
            		  dataToSave.clients = clients
                  fs.writeFile(file_path_clients, JSON.stringify(dataToSave), (err) => {
                      if(err){
                        console.error("Invalid email format")
                    		let dataReturned = {}
                    		dataReturned.flag=-3
                    		dataReturned.error="writeFile"
                    		res.send(JSON.stringify(dataReturned))
                      }
                      else{
                        console.log('It\'s saved!')
                        let dataReturned = {}
                    		dataReturned.flag=1
                    		dataReturned.client=clientToSave
                    		res.send(JSON.stringify(dataReturned))
                      }
                  })
                }
          		})
          		.catch(SyntaxError, function(err) {
          		    console.error("Invalid JSON in file", err)
          		    let dataReturned = {}
          		    dataReturned.flag=-1
          		    dataReturned.error="JSON"
          		    res.send(JSON.stringify(dataReturned))
          		})
          		.catch(function(err) {
          		    console.error("Unable to read file", err)
          		    let dataReturned = {}
          		    dataReturned.flag=-2
          		    dataReturned.error="fichier"
          		    res.send(JSON.stringify(dataReturned))
          		})
            }
            else {
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
          let temp = {}
          temp = req.body
          if(validator.isEmail(temp.email)){
            let drivers = []
            fsP(file_path_drivers, "utf8")
            .then(JSON.parse)
            .then(function(val) {
              drivers = val.drivers
              console.log(clients)
              if(!drivers)
                drivers = []
              if(temp.function=="login"){
                console.log('login')
                let flag = false
                let dataReturned = {}
                for(let i=0; i<drivers.length; i++){
                  console.log(drivers[i])
                  if(drivers[i].email==temp.email && drivers[i].password==temp.password ){
                     dataReturned.flag=1
                     dataReturned.driver=drivers[i]
                     res.send(JSON.stringify(dataReturned))
                     flag=true
                  }
                }
                if(!flag){
                  dataReturned.flag=0
                  dataReturned.error="aucune"
                  res.send(JSON.stringify(dataReturned))
                }
              }
              else if(temp.function=="signup"){
                console.log('signup')
                let driverToSave        = {}
                driverToSave.email      = temp.email
                driverToSave.password   = temp.password
                driverToSave.Firstname  = temp.Firstname
                driverToSave.Lastname   = temp.Lastname
                driverToSave.id         = 0
                for(let i=0; i<drivers.length; i++)
                  if(drivers[i].id > driverToSave.id)
                    driverToSave.id     = drivers[i].id + 0
                driverToSave.id++
                drivers.push(driverToSave)
                let dataToSave   = {}
                dataToSave.drivers = drivers
                fs.writeFile(file_path_drivers, JSON.stringify(dataToSave), (err) => {
                    if(err){
                      console.error("Invalid email format")
                      let dataReturned = {}
                      dataReturned.flag=-3
                      dataReturned.error="writeFile"
                      res.send(JSON.stringify(dataReturned))
                    }
                    else{
                      console.log('It\'s saved!')
                      let dataReturned = {}
                      dataReturned.flag=1
                      dataReturned.driver=driverToSave
                      res.send(JSON.stringify(dataReturned))
                    }
                })
              }
            })
            .catch(SyntaxError, function(err) {
                console.error("Invalid JSON in file", err)
                let dataReturned = {}
                dataReturned.flag=-1
                dataReturned.error="JSON"
                res.send(JSON.stringify(dataReturned))
            })
            .catch(function(err) {
                console.error("Unable to read file", err)
                let dataReturned = {}
                dataReturned.flag=-2
                dataReturned.error="fichier"
                res.send(JSON.stringify(dataReturned))
            })
          }
          else {
            console.error("Invalid email format")
            let dataReturned = {}
            dataReturned.flag=-11
            dataReturned.client="format"
            res.send(JSON.stringify(dataReturned))
          }
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

/*
CRUD FOR BOOKING
*/
app.route('/bookings')
        .get((req, res) => {
		console.log(req)
//control data
    let dataReturned  = {}
    let bookings      = []
  /*if(!req.query || !req.query.client){
		    console.log("client null")
		    dataReturned.flag=-99
		    dataReturned.error="query"
		    res.send(JSON.stringify(dataReturned))
		    return
		}*/
    fsP(file_path_bookings, "utf8")
		.then(JSON.parse)
		.then(function(val) {
      bookings        = val.bookings
      dataReturned.bookings = []
      for(let i=0; i<bookings.length; i++){
        //if(bookings[i].client===req.query.client){
  		   console.log(bookings[i])
  		   dataReturned.flag=1
  		   dataReturned.bookings.push(bookings[i])
  	    }
  	  res.send(JSON.stringify(dataReturned))
    })
    .catch(SyntaxError, function(err) {
		    console.error("Invalid JSON in file", err)
		    let dataReturned = {}
		    dataReturned.flag=-1
		    dataReturned.error="JSON"
		    res.send(JSON.stringify(dataReturned))
		})
		.catch(function(err) {
		    console.error("Unable to read file", err)
		    let dataReturned = {}
		    dataReturned.flag=-2
		    dataReturned.error="fichier"
		    res.send(JSON.stringify(dataReturned))
		})
  })

app.route('/bookings')
        .post((req, res) => {
//control data
      let bookingToSave = {}
      let temp = {}
      temp = req.body
      bookingToSave.time         = temp.time
      bookingToSave.adresse      = temp.adresse
      bookingToSave.zipCode      = temp.zipCode
      bookingToSave.city         = temp.city
      bookingToSave.destination  = temp.destination
      bookingToSave.zipCodeD     = temp.zipCodeD
      bookingToSave.cityD        = temp.cityD
      bookingToSave.comments     = temp.comments
      bookingToSave.client       = temp.client
      bookingToSave.status	 = 2
      let verif = true
      if(verif){
//generate booking_id
    		var d = new Date()
    		bookingToSave.id = d.valueOf().toString()
//insert into database
    		fsP(file_path_bookings, "utf8")
    		.then(JSON.parse)
    		.then(function(val) {
    		  let flag = false
    		  let dataReturned = {}
          let dataToSave   = {}
    		  dataToSave.bookings = val.bookings
    		  if(!dataToSave.bookings)
    		    dataToSave.bookings = []
    		  dataToSave.bookings.push(bookingToSave)
    		  fs.writeFile(file_path_bookings, JSON.stringify(dataToSave), (err) => {
            if (err) {throw err}
            console.log('It\'s saved!')
    		    dataReturned.flag=1
            res.send(JSON.stringify(dataReturned))
          })
    		})
    		.catch(SyntaxError, function(err) {
    		    console.error("Invalid JSON in file", err)
    		    let dataReturned = {}
    		    dataReturned.flag=-1
    		    dataReturned.error="JSON"
    		    res.send(JSON.stringify(dataReturned))
    		})
    		.catch(function(err) {
    		    console.error("Unable to read file", err)
    		    let dataReturned = {}
    		    dataReturned.flag=-2
    		    dataReturned.error="fichier"
    		    res.send(JSON.stringify(dataReturned))
    		})
      }
      else {
    		console.error("Invalid email format")
    		let dataReturned = {}
    		dataReturned.flag=-11
    		dataReturned.client="format"
    		res.send(JSON.stringify(dataReturned))
      }
    })

app.route('/bookings')
      .put((req, res) => {
	
      console.log("hehe")
//control data
	    let bookingToSave = {}
      let temp = {}
      temp = req.body
      let id = temp.id
      let status = temp.status
      if(id){
//find in database
    		fsP(file_path_bookings, "utf8")
    		.then(JSON.parse)
    		.then(function(val) {
          let flag = false
          let bookings = val.bookings
          let dataToSave = {}
          let i
          for(i=0; i<bookings.length; i++){
            console.log(bookings[i].id + " " + id)
            console.log(parseInt(bookings[i].status) + " " + parseInt(status))
            //status 1:created  2:in pprogress   3:accepted  99:refused
            if(bookings[i].id==id && parseInt(status)==parseInt(bookings[i].status)+1){
              bookingToSave = JSON.parse(JSON.stringify(bookings[i]))
              bookingToSave.status = status
              if(parseInt(status)===3)
                bookingToSave.driver = temp.driver
              flag = true
              break
            }
          }
          if(flag){
            bookings[i] = JSON.parse(JSON.stringify(bookingToSave))
            dataToSave.bookings = bookings
      		  fs.writeFile(file_path_bookings, JSON.stringify(dataToSave), (err) => {
              if (err) {throw err}
        		  let dataReturned = {}
              console.log('It\'s saved!')
      		    dataReturned.flag=1
              res.send(JSON.stringify(dataReturned))
            })
          }
          else {
        		console.error("Invalid booking")
        		let dataReturned = {}
        		dataReturned.flag=-404
        		dataReturned.error="data"
        		res.send(JSON.stringify(dataReturned))
          }
    		})
    		.catch(SyntaxError, function(err) {
    		    console.error("Invalid JSON in file", err)
    		    let dataReturned = {}
    		    dataReturned.flag=-1
    		    dataReturned.error="JSON"
    		    res.send(JSON.stringify(dataReturned))
    		})
    		.catch(function(err) {
    		    console.error("Unable to read file", err)
    		    let dataReturned = {}
    		    dataReturned.flag=-2
    		    dataReturned.error="fichier"
    		    res.send(JSON.stringify(dataReturned))
    		})
      }
      else {
    		console.error("Invalid booking")
    		let dataReturned = {}
    		dataReturned.flag=-11
    		dataReturned.error="format"
    		res.send(JSON.stringify(dataReturned))
      }
    })

app.route('/bookings')
      .delete((req, res) => {
//control data
	    let bookingToSave = {}
      let temp = {}
      temp = req.body
      let id = temp.id
      if(id){
//find in database
    		fsP(file_path_bookings, "utf8")
    		.then(JSON.parse)
    		.then(function(val) {
          let flag = false
          let bookings = val.bookings
          let dataToSave = {}
          let i
          for(i=0; i<bookings.length; i++){
            console.log(bookings[i].id + " " + id)
            console.log(parseInt(bookings[i].status))
            //status 1:created  2:in pprogress   3:accepted  99:refused
            if(bookings[i].id==id){
              bookingToSave = JSON.parse(JSON.stringify(bookings[i]))
              bookingToSave.status = 99
              flag = true
              break
            }
          }
          if(flag){
            bookings[i] = JSON.parse(JSON.stringify(bookingToSave))
            dataToSave.bookings = bookings
      		  fs.writeFile(file_path_bookings, JSON.stringify(dataToSave), (err) => {
              if (err) {throw err}
        		  let dataReturned = {}
              console.log('It\'s saved!')
      		    dataReturned.flag=1
              res.send(JSON.stringify(dataReturned))
            })
          }
          else {
        		console.error("Invalid booking")
        		let dataReturned = {}
        		dataReturned.flag=-404
        		dataReturned.error="data"
        		res.send(JSON.stringify(dataReturned))
          }
    		})
    		.catch(SyntaxError, function(err) {
    		    console.error("Invalid JSON in file", err)
    		    let dataReturned = {}
    		    dataReturned.flag=-1
    		    dataReturned.error="JSON"
    		    res.send(JSON.stringify(dataReturned))
    		})
    		.catch(function(err) {
    		    console.error("Unable to read file", err)
    		    let dataReturned = {}
    		    dataReturned.flag=-2
    		    dataReturned.error="fichier"
    		    res.send(JSON.stringify(dataReturned))
    		})
      }
      else {
    		console.error("Invalid booking")
    		let dataReturned = {}
    		dataReturned.flag=-11
    		dataReturned.error="format"
    		res.send(JSON.stringify(dataReturned))
      }
    })
