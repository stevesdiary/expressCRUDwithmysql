const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

// module.exports= async function application(app, opts){
app.get('/', async (req, res) => {
   res.send('Here is the first GET route')
})

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