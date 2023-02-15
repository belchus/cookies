
const { Router: router } = require('express')
const apiProducts = require('../api/app.js')
//import { DAOproductos } from '../config.js'
const routeProducts = new router()

//const products = new apiProducts('productos.txt')
const administrador = true


routeProducts.post('/', async (req, res) =>{
    if (administrador) {
        const savedProduct =   await DAOproductos.saveProduct(req.body)
        res.json(savedProduct)
    } else {
        res.json({ error : -1, descripcion: 'Sólo administradores' })
    }
})

routeProducts.put('/:id', async (req, res) =>{
    if (administrador) {
        const updateInfo = req.body
        const productsList = await DAOproductos.getAll()
        regToUpdate = productsList.findIndex(product => product.id === parseInt(req.params.id))
        if (regToUpdate === -1) {
            return res.send({ Error:  'Producto no encontrado' })
        }
        productsList[regToUpdate] = { ...updateInfo, id: parseInt(req.params.id) }
        await DAOproductos.saveData(productsList)
        res.json({ ...updateInfo, id: parseInt(req.params.id) })
    } else {
        res.json({ error : -1, descripcion: 'Sólo administradores' })
    }
})


routeProducts.delete('/:id', async (req, res) =>{
    if (administrador) {
        const deletedId = await DAOproductos.getById(parseInt(req.params.id))
        await DAOproductos.deleteById(parseInt(req.params.id))
        deletedId === null
            ? res.json( {'Producto con ID': `${parseInt(req.params.id)} no encontrado`} )
            : res.json( {'Producto eliminado': deletedId} )
    } else {
        res.json({ error : -1, descripcion: 'Sólo administradores' })
    }
})

module.exports = routeProducts