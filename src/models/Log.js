import mongoose from 'mongoose'

const logSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  acao: { type: String, required: true },
  detalhe: { type: String },
  data: { type: Date, default: () => new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })) }
})

export default mongoose.model('Log', logSchema)