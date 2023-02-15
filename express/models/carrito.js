const mongoose = require('mongoose') ;

const carritoCollections = 'carritos'

const carritoSchema = new mongoose.Schema({
    id: {type: Number, requird: true, dropDups: true},
    user: {type: String, required: true, max: 15},
    products: {type: Array, required: true},
})

module.exports = mongoose.model(carritoCollections, carritoSchema)