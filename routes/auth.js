const router = require('express').Router();
const User = require('../model/User');
const {keyGen} = require('../routes/validation');
const { valid } = require('@hapi/joi');

router.post('/generate', async (req,res) => {
    const error = keyGen(req.body);
    if(error.error) return res.status(400).send(error.error.details[0].message);
    
    
    //Checking if user is already in database
    const idExists = await User.findOne({discord_id: req.body.discord_id});
    if(idExists) return res.status(400).send('You already have a key.');


    //generate key 
    function create_UUID(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    //Create a new user
    const user = new User({
        discord_id: req.body.discord_id,
        email: req.body.email,
        key: create_UUID(),
    });
    try{
        const savedUser = await user.save();
        res.send({savedUser});
    }catch(err){
        req.statusCode(400).send(err);
    }

});


module.exports = router;