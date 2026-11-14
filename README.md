# Daily Diet (Fullstack)

Projeto da disciplina de Programação para WEB II (UNITINS).
Backend em Node.js + Express e frontend em React + Vite.

## Como rodar

### 1) Backend
```bash
cd backend
npm install
npm run dev
```
API em http://localhost:3333

### 2) Frontend (em outro terminal)
```bash
cd frontend
npm install
npm run dev
```
Abra http://localhost:5173

## Rotas da API
| Método | Rota | O que faz |
|---|---|---|
| POST | /usuarios | cria usuário |
| POST | /usuarios/login | entra com email |
| POST | /refeicoes | registra refeição |
| GET | /refeicoes | lista refeições do usuário |
| GET | /refeicoes/:id | vê uma refeição |
| PUT | /refeicoes/:id | edita refeição |
| DELETE | /refeicoes/:id | apaga refeição |
| GET | /refeicoes/metricas | métricas do usuário |

As rotas de refeição exigem o header `x-user-id` (id do usuário).
