# Grão & Byte — Backend

API REST desenvolvida para o sistema de gestão interna da cafeteria Grão & Byte.

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
| GET | /produtos/:id | Buscar produto |
| POST | /produtos | Criar produto |
| PUT | /produtos/:id | Editar produto |
| DELETE | /produtos/:id | Deletar produto |

### Usuários
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /usuarios | Listar usuários |
| PUT | /usuarios/:id | Alterar role |
| DELETE | /usuarios/:id | Deletar usuário |

### Logs
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /logs | Listar histórico |
| DELETE | /logs | Limpar histórico |
