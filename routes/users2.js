const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //to generate salt and hash the psw
const jwt = require('jsonwebtoken');
const config = require('config');
const {User2,validate} = require('../models/user2');
const _ =require('lodash'); // to pick the chosen items
const express = require('express');
const router = express.Router();

router.get('/me',auth,async (req,res)=>{
      const user = await User2.findById(req.user._id).select('-password');
      res.send(user);
});
router.post('/', async(req,res)=>{
    const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User2.findOne({email:req.body.email});
  if(user) return res.status(400).send('The user is already reistered');
  user = new User2(_.pick(req.body,['name','email','password']));
  const salt = await bcrypt.genSalt(10);
  user.password= await bcrypt.hash(user.password,salt);
  user.save();
  const token = user.getAuthToken();
  res.header('x-auth-token',token).send(_.pick(user,['_id','name','email'])); //send to header as codes
});

module.exports=router;