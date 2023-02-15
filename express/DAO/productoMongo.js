import mongodb from "../contenedores/mongodb.js"

const productSchema = 
    {
        title: {type: String, require: true, max: 70},
        price: {type: Number, require: true},
        stock: {type: Number, require: true, max: 200},
        id: {type: String, require: true},
        thumbnail: {type: String, require: true, max: 70}
    }

class productoMongo extends mongodb {

    constructor (){
        super('productos', productSchema)
    }

}

export default productoMongo