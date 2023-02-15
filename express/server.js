const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const session =require('express-session')
const FileStore= require('session-file-store')
const apiProducts = require('./api/app.js')
const routeProducts = require('./router/productsRouter.js')
const cartsRouter = require('./router/cartsRouter.js')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }


const PORT = 8080
const products = new apiProducts('productos.txt')

const server = app.listen(PORT, () =>{
    console.log(`Servidor HTTP escuchando en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor, ${error}`))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/public/views');
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use('/api/productos', routeProducts)
app.use('/api/carrito', cartsRouter)

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://belshus:<password>@cluster0.vu0bw1i.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }}),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie:
    {
        maxAge:30000
    }
}))


app.use((req, res) => {
    res.status(404).json({
        error: -1,
        descripcion: `ruta '${req.path}' método '${req.method}' no implementada`
    })
})

routeProducts.get('/', async (req, res) => {
    const productsList = await products.getAll()
    res.render('index.ejs', {
        misProd: productsList,
        productos: productsList.length
    })
})

const getNombreSession = req => req.session.nombre ?? ''

app.get('/login', (req, res) => {
   const userName = req.session?.user
    if (userName) {
        res.redirect('index,ejs')
    } else {
        res.redirect('/login.html')
    }
})

app.get('/logout', (req, res) => {
    const userName = req.session?.user
    req.session.destroy(error => {
        !error
            ? res.render('logout', { user: userName })
            : res.redirect('/home')
    })
})

app.post('/userlog', (req, res) => {
    req.session.user = req.body.userName
    res.redirect('/home')
})

routeProducts.get('/:id', async (req, res) =>{
    if (req.params.id === 'arrayproductos') {
        const allProducts = await products.getAll()
        res.json(allProducts)
    } else {
    const productById = [await products.getById(parseInt(req.params.id))]
    productById[0] === null
        ? res.json({ Error:  'Producto no encontrado' })
        : res.json(productById)
    }
})

