const Joi = require('joi');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const {User2} = require('../models/user2');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/',async (req,res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User2.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');
    const token = user.getAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
    res.send(token);
});
function validate(auth){
    const schema={
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    }
    return Joi.validate(auth,schema);
}
module.exports=router;