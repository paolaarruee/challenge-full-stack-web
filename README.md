
# 📚 Desafio A+ Educação - Sistema de Matrícula de Alunos

Aplicação full stack desenvolvida com **Vue.js + Vuetify** no frontend e **Node.js + Express + PostgreSQL** no backend. O sistema permite o cadastro, edição, exclusão e listagem de alunos com validação de CPF e RA, além de autenticação de usuários.

---

## 🚀 Tecnologias utilizadas

- **Frontend:**
  - Vue.js 3 (com Vite)
  - Vuetify
  - Yup (validações)
  - Axios
  - Frontend se encontra na branch main 

- **Backend:**
  - Node.js
  - Express
  - PostgreSQL
  - JWT (autenticação)
  - bcryptjs (hash de senhas)
  - dotenv (variáveis de ambiente)
  - Yup (validações)

---

## 🛠️ Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
Backend:
cd backend
npm install
Configure o ambiente do backend
exmeplo:
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
JWT_SECRET=sua_chave_secreta
Inicie os servidor
cd backend
npm run dev


Frontend:
cd ../front
npm install

Inicie os servidor
cd ../front
npm run dev


