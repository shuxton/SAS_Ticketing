const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const ticketSchema = new Schema({

    userid: {
        type: String
    }, 
    clientName:{
        type: String
    },
    project:{
        type: String
    },
    subject:{
        type: String
    },
    message:{
        type: String
    },
    createdAt:{
        type:String
    },
    status:{
        type:String
    },
    severity:{
        type: String
    },
    category:{
        type: String
    },
    estTime:{
        type: String
    },
    internalStatus:{
        type: String
    },
    forwardedTo:{
        type: String
    },
    display:{
        type:String
    },
    expectedResolution:{
        type:String
    },
    priority:{
        type:String
    },
    adminMessage:{
        type:String
    }
    

}) ; 

module.exports = mongoose.model('Ticket' , ticketSchema);