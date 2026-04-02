import Produto from '../models/Produto.js'
import { criarLog } from './logController.js'

export const getProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find()
    res.json(produtos)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getProdutoById = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id)
    res.json(produto)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const createProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, categoria } = req.body
    const produto = await Produto.create({ nome, descricao, preco, categoria })
    await criarLog(req.usuario?.email || 'desconhecido', 'criou produto', nome)
    res.status(201).json(produto)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true })
    await criarLog(req.usuario?.email || 'desconhecido', 'editou produto', produto.nome)
    res.json(produto)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id)
    await criarLog(req.usuario?.email || 'desconhecido', 'deletou produto', produto.nome)
    await Produto.findByIdAndDelete(req.params.id)
    res.json({ message: 'Produto deletado' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}