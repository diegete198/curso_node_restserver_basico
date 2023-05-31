const {Schema,model} = require('mongoose');

const ProductoSchema = Schema({
  nombre: {
type : String,
  required: [true, 'El nombre es obligatorio'],
  unique: true
  },
  estado: {
    type: Boolean,
    default: true,
    required: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  precio: {
    type: String,
    default: '0.00'
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  descripcion: {
    type: String
  },
    disponible: {
    type: Boolean,
    default: true
  }
});

ProductoSchema.methods.toJSON = function() {
  const { __v, estado, ...producto } = this.toObject();
  return producto;
}

module.exports = model('Producto', ProductoSchema);