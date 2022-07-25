const { MongoClient} = require('mongodb');
const { main } = require('process');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const application = require('./server');
const mysql = require('mysql2');


const connection= mysql.createConnection({
   host:'127.0.0.1',
   port: '3306',
   user: 'root',
   password: 'passw0rd',
   database: 'test'
})
connection.connect()

connection.query(
   "SELECT * FROM `client` WHERE `branch_id` =  '3' ",
   function(error, result, fs){
      console.log({error,result});
   }
);
// function application (req, res) {
   // ...

   // app.register(require('fastify-mongodb'), {
   //    url: 'mongodb://localhost:27017/'
   // })
//    res.send('Hello world')
   // our code..
// }

app.use('/', application)


app.listen(3000, function(){
   console.log('Server listening on port 3000')
})



