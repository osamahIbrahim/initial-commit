const Joi = require('joi');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

router.post('/', [auth, validate(validateReturn)], async (req, res) => {
    const rental = await Rental.lookup(req.body.customerId,req.body.movieId);
    if (!rental) return res.status(404).send('Rental not found.');
    if (rental.dateReturned) return res.status(400).send('Return already processed.');
    rental.return();
    await rental.save();
    await Movie.update({_id:rental.movie._id},{
        $inc:{numberInStock:1}
    });
    return res.send(rental);//should ues send here

});
function validateReturn(req) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    const result = schema.validate(req);
    return result;
}

module.exports= router;