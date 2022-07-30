const express = require('express');
const app = express();
const dotenv = require('dotenv');
const application = require('./server');
const mysql = require('mysql2');
dotenv.config();

require('dotenv').config();

const connection= mysql.createConnection({
   host:process.env.HOST,
   port: process.env.PORT,
   user: process.env.USERNAME,
   password: process.env.PASSWORD,
   database: process.env.DATABASE
})

connection.connect((err)=>{
   if (err) throw err;
   console.log('Connected to MYSQL server!')
});

app.use('/', application)

app.post('/create', function(req, res){
   const body = req.body
   const query = "INSERT INTO `bio` (`name`, `number`) VALUES('" + body.name + "', '" + body.number + "')"
   console.log({body, query})
connection.query(
   query,
   function(error, result){

      console.log(error, result)
      res.send(result != null ? 'Success' : 'fail')
   }
);
})

app.get('/readAll', function(req, res){
   const queryAll = "SELECT * FROM `bio`"
   const body = req.body
connection.query(
   queryAll,
   function(error, result){
      res.send(result)
      console.log(error, body, result)
   }
);
})

app.get('/readOne', function(req, res){
   const body = req.body
   const queryOne =`SELECT * FROM bio WHERE id = ${body.id}`
connection.query(
   queryOne,
   // "SELECT * FROM `bio` WHERE `id` = '3'",
   function(error, result){
      res.send(result)
      console.log(error, body, result)
   }
);
})

app.patch('/update', function(req, res){
   const body = req.body
   const query = 
   `
      UPDATE bio
      SET name = '${body.name}'
      WHERE id = '${body.id}'
   `
connection.query(
   query,
   function(error, result){
      console.log(result != null ? 'Success' : 'fail')
      res.send({error,result})
   }
);
})

app.delete('/delete', function(req, res){
   const body = req.body
   const query = `DELETE FROM bio WHERE id = ${body.id}`

connection.query(
   query,
   function(error, result){
      res.send(result)
      console.log(error, result != null ? 'Success' : 'fail')
   }
);
})

app.listen(3000, function(){
   console.log('Server listening on port 3000')
});