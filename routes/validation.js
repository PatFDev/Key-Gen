//VALIDATION
const Joi = require('@hapi/joi');

//Register Validation
const keyGen = data => {
    const schema = {
        discord_id: Joi.string().min(17).required(),
        email: Joi.string().min(6).required().email(), 
    };
    return Joi.validate(data,schema );
};

module.exports.keyGen = keyGen;