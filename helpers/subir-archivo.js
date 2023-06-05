const {v4: uuidv4} = require('uuid');
const path = require('path')

const subirArchivo= (files, extensionValidas = ['png', 'jpg', 'jpeg', 'gif', 'pdf'], carpeta = '') =>{

  return new Promise((resolve, reject) => {

  const { archivo } = files;
  const nombreCortado = archivo.name.split('.')
  const extensionFile = nombreCortado[nombreCortado.length - 1]
  
//Validar ectension
if(!extensionValidas.includes(extensionFile)) {
  return reject(`La extension ${extensionFile} no es permitida, ${extensionValidas}`)
}



  // res.json({extensionFile})

  const nombretem = uuidv4() + '.' + extensionFile;
  const uploadPath = path.join(__dirname, '../uploads/', carpeta,  nombretem);


  archivo.mv(uploadPath, (err) =>{
    if (err) {
      reject (err);
    }

    resolve(nombretem)
  });


  });

  
}

module.exports = {
  subirArchivo
}