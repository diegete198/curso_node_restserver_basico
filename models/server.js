
const express = require('express')
const cors = require('cors')
const { dbconnection } = require('../database/config')
const fileUpload = require('express-fileupload')

class Server {

  constructor() {
    this.app = express()
    this.PORT = process.env.PORT

    this.paths = {
      auth: '/api/auth',
      usuarios: '/api/users',
      categorias: '/api/categorias',
      productos: '/api/productos',
      buscar: '/api/buscar',
      uploads: '/api/uploads'

    }


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

    //carga de archivo
   this.app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true
}));

}

routes() {
  this.app.use(this.paths.auth, require('../routes/auth'))
  this.app.use(this.paths.usuarios, require('../routes/user'))
  this.app.use(this.paths.categorias, require('../routes/categorias'))
  this.app.use(this.paths.productos, require('../routes/productos'))
  this.app.use(this.paths.buscar, require('../routes/buscar'))
  this.app.use(this.paths.uploads, require('../routes/uploads'))
}

listen() {
  this.app.listen(this.PORT, () => {
  console.log (`Servidor corriendo en puerto`, this.PORT)
})
}

}

module.exports = Server;