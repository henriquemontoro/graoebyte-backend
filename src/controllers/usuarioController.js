import Usuario from '../models/Usuario.js'
import bcrypt from 'bcryptjs'

const tratarErro = (err, res) => {
  if (err.code === 11000) {
    const campo = Object.keys(err.keyPattern)[0]
    return res.status(400).json({ message: `Já existe um usuário com esse ${campo === 'email' ? 'email' : 'nome'}` })
  }
  res.status(500).json({ message: err.message })
}

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-senha')
    res.json(usuarios)
  } catch (err) { tratarErro(err, res) }
}

export const getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-senha')
    res.json(usuario)
  } catch (err) { tratarErro(err, res) }
}

export const deleteUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id)
    res.json({ message: 'Usuário deletado' })
  } catch (err) { tratarErro(err, res) }
}

export const updateUsuario = async (req, res) => {
  try {
    const { role, nome, email, senha } = req.body
    if (role === 'funcionario') {
      const admins = await Usuario.countDocuments({ role: 'admin' })
      const usuario = await Usuario.findById(req.params.id)
      if (admins === 1 && usuario.role === 'admin') {
        return res.status(400).json({ message: 'Não é possível remover o único admin do sistema.' })
      }
    }
    if (senha) {
      const erros = []
      if (senha.length < 8) erros.push('mínimo 8 caracteres')
      if (!/[A-Z]/.test(senha)) erros.push('1 letra maiúscula')
      if (!/[0-9]/.test(senha)) erros.push('1 número')
      if (!/[^A-Za-z0-9]/.test(senha)) erros.push('1 símbolo')
      if (erros.length > 0) return res.status(400).json({ message: `Senha deve ter: ${erros.join(', ')}` })
    }
    const update = {}
    if (role) update.role = role
    if (nome) update.nome = nome
    if (email) update.email = email
    if (senha) update.senha = await bcrypt.hash(senha, 10)
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, update, { new: true }).select('-senha')
    res.json(usuario)
  } catch (err) { tratarErro(err, res) }
}
