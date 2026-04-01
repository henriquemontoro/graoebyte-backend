import Produto from '../models/Produto.js'

export const getProdutos = async (req, res) => {
  const produtos = await Produto.find()
  res.json(produtos)
}

export const createProduto = async (req, res) => {
  const { nome, descricao, preco } = req.body
  const produto = await Produto.create({ nome, descricao, preco })
  res.status(201).json(produto)
}

export const updateProduto = async (req, res) => {
  const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(produto)
}

export const deleteProduto = async (req, res) => {
  await Produto.findByIdAndDelete(req.params.id)
  res.json({ message: 'Produto deletado' })
}