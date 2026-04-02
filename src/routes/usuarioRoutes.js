import express from 'express'
import { getUsuarios, deleteUsuario, updateUsuario } from '../controllers/usuarioController.js'

const router = express.Router()

router.get('/', getUsuarios)
router.delete('/:id', deleteUsuario)
router.put('/:id', updateUsuario)

export default router