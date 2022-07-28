const { main } = require('process');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const application = require('./server');
const mysql = require('mysql2');
dotenv.config();

const connection= mysql.createConnection({
   host:'127.0.0.1',
   port: process.env.PORT,
   user: 'root',
   password: 'passw0rd',
   database: 'test'
})

connection.connect((err)=>{
   if (err) throw err;
   console.log('Connected to MYSQL server!')
});
app.use('/', application)


app.get('/readAll', function(req, res){
   const queryAll = "SELECT * FROM `bio`"
   const body = req.body
connection.query(
   queryAll,
   function(error, result, fs){
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
   function(error, result, fs){
      res.send(result)
      console.log(error, body, result)
   }
);
})

app.post('/create', function(req, res){
   const body = req.body
   const query = "INSERT INTO `bio` (`name`, `number`) VALUES('" + body.name + "', '" + body.number + "')"
   console.log({body, query})
connection.query(

   query,
   // "SELECT `client`.`client_name` ?AS `Non_Employee_Entities`, `client`.`branch_id` AS `Branch_ID` FROM `client` UNION SELECT `branch_supplier`.`supplier_name`, `branch_supplier`.`branch_id` FROM `branch_supplier` LIMIT 2",
   function(error, result, fs){

      console.log(error, result)
      res.send(result != null ? 'Success' : 'fail')
   }
);
})
app.patch('/update', function(req, res){
   const body = req.body
   // const query = "UPDATE `bio` (`name`, `number`) = ('" + body.name + "', '" + body.number + "') WHERE (`name`, `number`)"
   const query = `
      UPDATE bio
      SET name = '${body.name}'
      WHERE id = '${body.id}'
   `
connection.query(
   query,
   // "UPDATE `bio` SET `name` = 'ADEOLU', `number` = '112233' WHERE `name` = 'ADEBAYO'",
   function(error, result, fs){
      console.log(result != null ? 'Success' : 'fail')
      // console.log(error)
      res.send({error,result})
   }
);
})

app.delete('/delete', function(req, res){
   const body = req.body
   const query = `DELETE FROM bio WHERE id = ${body.id}`

connection.query(
   query,
   function(error, result, fs){
      res.send(result)
      console.log(error, result != null ? 'Success' : 'fail')
   }
);
})


app.listen(3000, function(){
   console.log('Server listening on port 3000')
})



