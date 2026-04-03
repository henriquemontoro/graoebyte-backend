import mongoose from 'mongoose'

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true },
  categoria: { type: String, default: 'Outros' },
  disponivel: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('Produto', produtoSchema)