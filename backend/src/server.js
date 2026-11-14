// server.js: só liga o servidor na porta 3333.
import app from './app.js'

const PORTA = 3333

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`)
})
