import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'
import { criarLog } from './logController.js'

export const register = async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body
    const hash = await bcrypt.hash(senha, 10)
    const usuario = await Usuario.create({ nome, email, senha: hash, role })
    await criarLog(req.usuario?.email || 'admin', 'criou usuário', email)
    res.status(201).json({ message: 'Usuário criado!' })
  } catch (err) {
    if (err.code === 11000) { const campo = Object.keys(err.keyPattern)[0]; res.status(400).json({ message: `Já existe um usuário com esse ${campo === "email" ? "email" : "nome"}` }) } else { res.status(500).json({ message: err.message }) }
  }
}

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body
    const usuario = await Usuario.findOne({ email })
    if (!usuario) return res.status(401).json({ message: 'Credenciais inválidas' })
    const valido = await bcrypt.compare(senha, usuario.senha)
    if (!valido) return res.status(401).json({ message: 'Credenciais inválidas' })
    const token = jwt.sign({ id: usuario._id, role: usuario.role, email: usuario.email, nome: usuario.nome }, process.env.JWT_SECRET, { expiresIn: '1d' })
    await criarLog(usuario.nome, 'acessou o sistema', '')
    res.json({ token, role: usuario.role, nome: usuario.nome })
  } catch (err) {
    if (err.code === 11000) { const campo = Object.keys(err.keyPattern)[0]; res.status(400).json({ message: `Já existe um usuário com esse ${campo === "email" ? "email" : "nome"}` }) } else { res.status(500).json({ message: err.message }) }
  }
}