// ============================================================
// Middleware: identificarUsuario
// Regra 2 da atividade: "Identificar o usuário entre as requisições".
//
// Como eu fiz: depois de criar o usuário, o front guarda o id dele
// e manda em TODA requisição no cabeçalho (header) "x-user-id".
// Este middleware roda ANTES das rotas de refeição, confere se o id
// existe e, se existir, coloca o usuário em req.usuario.
// ============================================================
import { lerBanco } from '../database.js'

export function identificarUsuario(req, res, next) {
  const usuarioId = req.headers['x-user-id'] // pega o header

  // se nem mandou o header, não sei quem é
  if (!usuarioId) {
    return res.status(401).json({ erro: 'Usuário não identificado. Envie o header x-user-id.' })
  }

  const banco = lerBanco()
  const usuario = banco.usuarios.find((u) => u.id === usuarioId)

  // mandou um id, mas ele não existe no banco
  if (!usuario) {
    return res.status(401).json({ erro: 'Usuário inválido.' })
  }

  req.usuario = usuario // guardo para os controllers usarem
  next() // libera para continuar para a rota
}
