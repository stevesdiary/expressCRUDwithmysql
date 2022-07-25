const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

// module.exports= async function application(app, opts){
app.get('/', async (req, res) => {
   res.send('Here is the first GET route')
})

// const connection= mysql.createConnection({
//    host:'127.0.0.1',
//    port: '3306',
//    user: 'root',
//    password: 'passw0rd',
//    database: 'test'
// })
// connection.connect()

// connection.query(
//    "SELECT * FROM `branch` WHERE `branch_name` = 'Stamford'",
//    function(error, result, fs){
//       console.log({error,result});
//    }
// );

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.post('/user', (req, res)=> {
   res.send(req.body.Text)
})
app.patch('/user1', (req, res)=> {
   res.send('Got a patch request at /user')
})
app.delete('/user', (req, res)=> {
   res.send('Got a delete request at /user')
})




module.exports = app