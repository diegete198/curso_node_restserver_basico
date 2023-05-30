
const express = require('express')
const cors = require('cors')
const { dbconnection } = require('../database/config')

class Server {

  constructor() {
    this.app = express()
    this.PORT = process.env.PORT
    this.usuariosPath = '/api/users'
    this.authPath = '/api/auth'

    //ConexionDB
    this.conectarDB();
    
    //Midlewares
    this.middleware();

    //Rutas de aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbconnection();
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
  this.app.use(this.authPath, require('../routes/auth'))
  this.app.use(this.usuariosPath, require('../routes/user'))
}

listen() {
  this.app.listen(this.PORT, () => {
  console.log (`Servidor corriendo en puerto`, this.PORT)
})
}

}

module.exports = Server;