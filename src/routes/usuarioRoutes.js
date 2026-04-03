import express from 'express'
import { getUsuarios, getUsuarioById, deleteUsuario, updateUsuario } from '../controllers/usuarioController.js'

const router = express.Router()

router.get('/', getUsuarios)
router.get('/:id', getUsuarioById)
router.delete('/:id', deleteUsuario)
router.put('/:id', updateUsuario)

export default router