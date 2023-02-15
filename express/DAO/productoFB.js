
import firebase from "../contenedores/firebase.js"

class productoFB extends firebase {

    constructor (){
        super('productos')
    }

}

export default productoFB