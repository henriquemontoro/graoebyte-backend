import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

export const register = async (req, res) => {
  const { email, senha } = req.body
  const hash = await bcrypt.hash(senha, 10)
  const usuario = await Usuario.create({ email, senha: hash })
  res.status(201).json({ message: 'Usuário criado!' })
}

export const login = async (req, res) => {
  const { email, senha } = req.body
  const usuario = await Usuario.findOne({ email })
  if (!usuario) return res.status(401).json({ message: 'Credenciais inválidas' })
  const valido = await bcrypt.compare(senha, usuario.senha)
  if (!valido) return res.status(401).json({ message: 'Credenciais inválidas' })
  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
  res.json({ token })
}