const mongoose = require('mongoose');

const Schema = mongoose.Schema ;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    password: {
        type:String
    },
    username: {
        type: String , 
        required: true, 
        unique: true
    } , 
    type: {
        type: String ,  
    } , 
    displayName:{
        type:String
    }
});


UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User' , UserSchema);