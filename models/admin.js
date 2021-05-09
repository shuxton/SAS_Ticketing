const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const adminSchema = new Schema({
   project:{
       type:Array
    },
    severity:{
        type:Array
     },
     category:{
        type:Array
     },
     internalStatus:{
        type:Array
     },
     priority:{
        type:Array
     },
});



module.exports = mongoose.model('Admin' , adminSchema);