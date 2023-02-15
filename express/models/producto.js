const mongoose = require('mongoose') ;

const productosCollections = 'productos'

const ProductoSchema = new mongoose.Schema({
    title: {type: String, required: true, max: 70},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true},
    stock:{type: Number, required: true},
    id: {type: Number, requird: true, dropDups: true},
})

module.exports = mongoose.model(productosCollections, ProductoSchema)