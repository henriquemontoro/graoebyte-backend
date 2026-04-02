import express from 'express'
import { getLogs, limparLogs } from '../controllers/logController.js'

const router = express.Router()

router.get('/', getLogs)
router.delete('/', limparLogs)

export default router