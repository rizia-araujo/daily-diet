// ============================================================
// Controller de usuários
// Controller = onde fica a "lógica" de cada rota.
// ============================================================
import { randomUUID } from 'crypto'
import { lerBanco, salvarBanco } from '../database.js'

// POST /usuarios  -> cria um usuário (regra 1)
export function criarUsuario(req, res) {
  const { nome, email } = req.body

  // validação básica: nome e email são obrigatórios
  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email são obrigatórios.' })
  }

  const banco = lerBanco()

  // não deixo criar dois usuários com o mesmo email
  const jaExiste = banco.usuarios.find((u) => u.email === email.toLowerCase())
  if (jaExiste) {
    return res.status(409).json({ erro: 'Já existe um usuário com esse email.' })
  }

  const novoUsuario = {
    id: randomUUID(), // gera um id único tipo "a1b2-c3d4..."
    nome,
    email: email.toLowerCase(),
  }

  banco.usuarios.push(novoUsuario)
  salvarBanco(banco)

  return res.status(201).json(novoUsuario) // 201 = criado com sucesso
}

// POST /usuarios/login -> "entra" com um email que já existe
// (não tem senha porque a atividade não pede, é só pra identificar)
export function entrar(req, res) {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ erro: 'Informe o email.' })
  }

  const banco = lerBanco()
  const usuario = banco.usuarios.find((u) => u.email === email.toLowerCase())

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' })
  }

  return res.json(usuario)
}
