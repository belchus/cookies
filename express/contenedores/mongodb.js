import mongoose from "mongoose" 

mongoose.connect('mongodb+srv://belshus:<password>@cluster0.vu0bw1i.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, error => {
        if(error) throw new Error(`Error al conectar a base de datos, ${error}`)
        console.log('Base de datos conectada')
    }
)

class mongodb {

    constructor (collection, schema) {
        const newSchema = new mongoose.Schema(schema)
        this.newModel = mongoose.model(collection, newSchema)
    }

 
    async getAll() {
        try {
            return await this.newModel.find().then(res => { return res })
        } catch (error) {
            console.log('Error en la base de datos', error)
        }
    }

    async getById(id) {
        try {
            return await this.newModel.findById(id).then(res => { return res })
        } catch (error) {
            console.log('El producto no existe', error)
        }
    }

    async deleteById(id) {
        try {
            return await this.newModel.deleteOne( {_id: id} ).then(res => { return res })
        } catch (error) {
            console.log('Error al eliminar ', error)
        }
    }


    async deleteAll() {
        try {
            return await this.newModel.deleteMany({}).then(res => { return res })
        } catch (error) {
            console.log('Error al eliminar los productos', error)
        }
    }


    async saveProduct (product) {
        try {
            await new this.newModel(product).save().then(res => { return res })
        } catch (error) {
            console.log(`Error en la base de datos, ${error}`)
        }
    }


    async updateById(id, data) {
        try {
            return await this.newModel.updateOne( {_id: id}, data ).then(res => { return res })
        } catch (error) {
            console.log('Error al actualizar ', error)
        }
    }

   
    async saveCart () {
        try {
            const newCart = {
                productos: []
            }
            await new this.newModel(newCart).save().then(res => { return res })
        } catch (error) {
            console.log(`Error en la base de datos, ${error}`)
        }
    }

    async addProductById (id, data) {
        try {
            await this.newModel.updateOne( {_id: id}, {$push: {productos: data}} )
            const updatedCart = await this.getById(id)
            return updatedCart
        } catch (error) {
            console.log(`Error en la base de datos, ${error}`)
        }
    }

    async deleteProductById (id, data) {
        try {
            const dataId = (JSON.stringify(data._id))
            const cartToUpdate = await this.getById(id)
            const productToDelete = cartToUpdate.productos.findIndex(product => JSON.stringify(product._id) === dataId)
            cartToUpdate.productos.splice(productToDelete, 1)
            await this.newModel.updateOne( {_id: id}, {$set: {productos: cartToUpdate.productos}} )
            const updatedCart = await this.getById(id)
            return updatedCart
        } catch (error) {
            console.log(`Error en la base de datos, ${error}`)
        }
    }

}

export default mongodb