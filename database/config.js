const mongoose = require('mongoose');

const dbconnection = async() => {

  try{ 

    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true
    });

    console.log('Base de datos')

  }
  catch (err){
    console.log(err)
    throw new Error('Error en la conexion a la BD')
  }

  

}


module.exports = {dbconnection};