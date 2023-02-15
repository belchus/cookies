
//import { DAOcarritos } from '../config.js'
//import { DAOproductos } from '../config.js'
const { Router: router } = require('express')
//const apiCarts = require('../api/carts.js')

const routeCarts = new router()

//const carts = new apiCarts('carts.txt')

routeCarts.get('/:id/productos', async (req, res) => {
    const cart = await DAOcarritos.getById(parseInt(req.params.id))
    res.json(cart)
})

routeCarts.post('/', async (req, res) => {
    const newCart = await DAOcarritos.saveCart()
    res.json(newCart)
})


routeCarts.post('/:id_cart/productos/:id_prod', async (req, res) => {
    const product = await DAOproductos.getById(req.params.id_prod)
    const addProduct = await DAOcarritos.addProductById(req.params.id_cart, product)
    res.json(addProduct)
})

routeCarts.delete('/:id_cart/productos/:id_prod', async (req, res) => {
    const product = await DAOproductos.getById(req.params.id_prod)
    const productToDelete = await DAOcarritos.deleteProductById(req.params.id_cart, product)
    res.json(productToDelete)
})

routeCarts.delete('/:id', async (req, res) => {
    const deletedCart = await DAOcarritos.deleteById(req.params.id)
    res.json(deletedCart)
})

routeCarts.get('/carritos', async (req, res) => {
    const allCarts = await DAOcarritos.getById('1') || { productos: [] }
    res.render('./content/carts',
        {
            allCarts: allCarts,
            cartsQty: allCarts.length
        }
    )
})

module.exports = routeCarts