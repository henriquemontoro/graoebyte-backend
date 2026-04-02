import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import produtoRoutes from './routes/produtoRoutes.js'
import authRoutes from './routes/authRoutes.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import logRoutes from './routes/logRoutes.js'
import { autenticar } from './middleware/auth.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(autenticar)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado!'))
  .catch((err) => console.log('Erro ao conectar:', err))

app.use('/auth', authRoutes)
app.use('/produtos', produtoRoutes)
app.use('/usuarios', usuarioRoutes)
app.use('/logs', logRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Backend rodando!' })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})