# Grão & Byte — Backend

API REST para o sistema de gestão interna da cafeteria Grão & Byte.

## Tecnologias
- Node.js + Express
- MongoDB (Atlas) + Mongoose
- JWT para autenticação
- bcryptjs para criptografia de senhas

## Como rodar

### Pré-requisitos
- Node.js instalado
- Conta no MongoDB Atlas

### Instalação
```bash
npm install
```

### Variáveis de ambiente
Crie um arquivo `.env` na raiz com:
```
MONGODB_URI=sua_connection_string_aqui
PORT=3001
JWT_SECRET=seu_segredo_aqui
```

### Rodar em desenvolvimento
```bash
npm run dev
```

## Endpoints

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /auth/register | Cadastrar usuário |
| POST | /auth/login | Login |

### Produtos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /produtos | Listar produtos |
| GET | /produtos/:id | Buscar produto por ID |
| POST | /produtos | Criar produto |
| PUT | /produtos/:id | Editar produto |
| DELETE | /produtos/:id | Deletar produto |

### Usuários
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /usuarios | Listar usuários |
| GET | /usuarios/:id | Buscar usuário por ID |
| PUT | /usuarios/:id | Editar usuário |
| DELETE | /usuarios/:id | Deletar usuário |

### Logs
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /logs | Listar histórico |
| DELETE | /logs | Limpar histórico |

## Modelos

### Produto
- nome (único), descrição, preço, categoria, disponível, timestamps

### Usuário
- nome (único), email (único), senha (criptografada), role (admin/funcionario)

## Segurança
- Senhas criptografadas com bcryptjs
- Requisitos de senha: mínimo 8 caracteres, 1 maiúscula, 1 número, 1 símbolo
- Autenticação via JWT com nome e role no token
- Proteção contra remoção do único admin
- Logs detalhados de todas as ações do sistema
