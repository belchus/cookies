import productoMongo from '../DAO/productoMongo.js'
import carritoMongo from '../DAO/carritoMongo.js'
import productoFB from '../DAO/productoFB.js'
import carritoFB from '../DAO/carritoFB.js'

let DAOproductos = null
let DAOcarritos = null
const persistenceMethod = 'firebase'

switch (persistenceMethod) {
    case 'mongoDB':
        DAOproductos = new productoMongo()
        DAOcarritos = new carritoMongo()
        break
    case 'firebase':
        DAOproductos = new productoFB()
        DAOcarritos = new carritoFB()
        break
}

export { DAOproductos, DAOcarritos }