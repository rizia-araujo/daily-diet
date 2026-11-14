// app.js: monta o express com os middlewares e as rotas.
import express from 'express'
import cors from 'cors'
import usuariosRoutes from './routes/usuarios.routes.js'
import refeicoesRoutes from './routes/refeicoes.routes.js'

const app = express()

app.use(cors()) // permite o front (outra porta) conversar com a API
app.use(express.json()) // faz o express entender JSON no corpo da requisição

app.get('/', (req, res) => {
  res.json({ mensagem: 'API Daily Diet funcionando!' })
})

app.use('/usuarios', usuariosRoutes)
app.use('/refeicoes', refeicoesRoutes)

export default app
