
const express = require('express')
const cors = require('cors')

class Server {

  constructor() {
    this.app = express()
    this.PORT = process.env.PORT
    this.usuariosPath = '/api/users'
    
    //Midlewares
    this.middleware();

    //Rutas de aplicacion
    this.routes();
  }

   middleware() {
    //CORS
    this.app.use(cors())

    //parse y lectura
    this.app.use(express.json());

    //Directorio publico
      this.app.use(express.static('public'))
    }

routes() {
 
  this.app.use(this.usuariosPath, require('../routes/user'))
}

listen() {
  this.app.listen(this.PORT, () => {
  console.log (`Servidor corriendo en puerto`, this.PORT)
})
}

}

module.exports = Server;