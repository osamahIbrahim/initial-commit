const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const user2Schema=new mongoose.Schema({
    name:{
    type:String,
    minlength:5,
    maxlength:50,
    required:true
    },
    email:{
    type:String,
    minlength:5,
    maxlength:255,
    required:true,
    unique:true
    },
    password:{
    type:String,
    minlength:5,
    maxlength:1024,
    required:true
    },
    isAdmin:Boolean
    });

    user2Schema.methods.getAuthToken=function(){
        const token = jwt.sign({_id:this._id, isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
        return token;
    }
    const User2 = mongoose.model('User2',user2Schema);

function validateUser(user){
    const schema={
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user,schema);
}
exports.validate = validateUser;
exports.User2 = User2;