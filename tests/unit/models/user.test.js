const {User} = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.generateAuthToken',()=>{
it('Generate valid jwt',()=>{
const palyload={
    _id:new mongoose.Types.ObjectId().toHexString(),
    isAdmin:true
}
const user=new User(palyload);
const token= user.generateAuthToken();
const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
expect(decoded).toMatchObject(palyload);
});
});
