import Log from '../models/Log.js'

export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ data: -1 }).limit(100)
    res.json(logs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const criarLog = async (usuario, acao, detalhe) => {
  try {
    await Log.create({ usuario, acao, detalhe })
  } catch (err) {
    console.log('Erro ao criar log:', err)
  }
}