const { constants } = require("crypto");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BorrowerSchema = new Schema({

   firstName: String,
   lastName: String,
   amount: integer(7),

});

module.exports = mongoose.model("book", BorrowerSchema);