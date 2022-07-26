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
dotenv.config();


const connection= mysql.createConnection({
   host:'127.0.0.1',
   port: process.env.PORT,
   user: 'root',
   password: 'passw0rd',
   database: 'test'
})
connection.connect()

connection.query(
   "SELECT `first_name` FROM `employee` limit 1",


   // "SELECT `client`.`client_name` FROM `client` WHERE `client`.`client_id` IN (SELECT `client_id` FROM (SELECT SUM (`works_with`.`total_sales`) AS `Totals`, `client_id` FROM `works_with` GROUP BY `client_id`) AS `total_client_sales` WHERE `totals` > 100000)",

   // "SELECT `employee`.`first_name`, `employee`.`last_name` FROM `employee` WHERE `employee`.`emp_id` IN (SELECT `works_with`.`emp_id` FROM `works_with`) AND `employee`.`branch_id`  ",

   // "SELECT `client`.`client_id`, `client`.`client_name` FROM `client` WHERE `client`.`branch_id` = (SELECT `branch`.`branch_id` FROM `branch` WHERE `branch`.`mgr_id` =(SELECT `employee`.`emp_id` FROM `employee` WHERE `employee`.`first_name`= 'Michael' AND `employee`.`last_name` = 'Scott' LIMIT 1))", 

   // "SELECT `client`.`client_name` AS `Non_Employee_Entities`, `client`.`branch_id` AS `Branch_ID` FROM `client` UNION SELECT `branch_supplier`.`supplier_name`, `branch_supplier`.`branch_id` FROM `branch_supplier`",

   // "SELECT * FROM `client` WHERE `client_name` LIKE '%LLC'",
   // "SELECT COUNT(`sex`), `sex` FROM `employee` GROUP BY `sex`",

   // "SELECT * FROM `employee` WHERE `first_name` IN ('Jim', 'Michael', 'Johnny', 'David')",

   // "SELECT * FROM `employee` WHERE `birth_day`>= 1970-01-01 AND `sex` = 'F' OR `salary` > 80000",
   
   // "SELECT * FROM `employee` WHERE `birth_day`>= 1970-01-01 AND `sex` = 'F' OR `salary` > 80000",


   function(error, result, fs){
      console.log({error, result});
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



