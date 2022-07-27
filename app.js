const { main } = require('process');
const express = require('express');
const app = express();
const path = require('path');
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

// connection.query(
   // "SELECT `first_name` FROM `employee` limit 1",
//    "INSERT INTO `bio`(`name`, `number`) VALUES('Ade', '123456')",

//    function(error, result, fs){
//       console.log({error, result});
//    }
// );


app.get('/home', function(req, res){

connection.query(
   // "SELECT `client`.`client_name` AS `Non_Employee_Entities`, `client`.`branch_id` AS `Branch_ID` FROM `client` UNION SELECT `branch_supplier`.`supplier_name`, `branch_supplier`.`branch_id` FROM `branch_supplier` LIMIT 2",
   "SELECT * FROM `bio`",
   function(error, result, fs){
      res.send(result)
      console.log(result)
   }
);
})

app.post('/home', function(req, res){
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
      WHERE name = '${body.name}'
   `
connection.query(
   query,
   // "UPDATE `bio` SET `name` = 'ADEOLU', `number` = '112233' WHERE `name` = 'ADEBAYO'",

   function(error, result, fs){
      console.log(result != null ? 'Success' : 'fail')
      console.log(error)
      res.send({error,result})
   }
);
})

app.delete('/delete', function(req, res){

   const query = "DELETE FROM `bio` WHERE `number` = ('" + body.number + " )"

connection.query(
   query,

   // "DELETE FROM `bio` WHERE `name` = 'Ade'",

   // "SELECT `client`.`client_name` AS `Non_Employee_Entities`, `client`.`branch_id` AS `Branch_ID` FROM `client` UNION SELECT `branch_supplier`.`supplier_name`, `branch_supplier`.`branch_id` FROM `branch_supplier` LIMIT 1",

   function(error, result, fs){
      res.send(result)
      console.log(error, result != null ? 'Success' : 'fail')
   }
);
})


app.listen(3000, function(){
   console.log('Server listening on port 3000')
})



