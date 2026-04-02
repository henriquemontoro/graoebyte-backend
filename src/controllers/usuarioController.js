import Usuario from '../models/Usuario.js'

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-senha')
    res.json(usuarios)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id)
    res.json({ message: 'Usuário deletado' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateUsuario = async (req, res) => {
  try {
    const { role } = req.body
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-senha')
    res.json(usuario)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}