// ============================================================
// Controller de refeições
// Aqui estão as regras 3 a 9 da atividade.
// Em todas essas funções o req.usuario já existe, porque o
// middleware identificarUsuario rodou antes.
// ============================================================
import { randomUUID } from 'crypto'
import { lerBanco, salvarBanco } from '../database.js'
import { calcularMetricas } from '../utils/calcularMetricas.js'

// Função auxiliar: confere se os dados da refeição estão certos.
// Se estiver tudo ok devolve null, se não devolve a mensagem de erro.
function validarRefeicao(dados) {
  const { nome, descricao, dataHora, dentroDaDieta } = dados

  if (!nome || !descricao || !dataHora) {
    return 'Nome, descrição e data/hora são obrigatórios.'
  }
  if (isNaN(new Date(dataHora))) {
    return 'Data/hora inválida.'
  }
  // tem que ser true ou false mesmo (boolean), não texto
  if (typeof dentroDaDieta !== 'boolean') {
    return 'dentroDaDieta deve ser true ou false.'
  }
  return null
}

// Outra auxiliar: acha a refeição pelo id e já checa a permissão (regra 9).
// Devolve { refeicao } se deu tudo certo ou { erro, status } se deu problema.
function buscarRefeicaoDoUsuario(banco, id, usuarioId) {
  const refeicao = banco.refeicoes.find((r) => r.id === id)

  if (!refeicao) {
    return { erro: 'Refeição não encontrada.', status: 404 }
  }
  // a refeição existe, mas é de OUTRA pessoa -> 403 (proibido)
  if (refeicao.usuarioId !== usuarioId) {
    return { erro: 'Você não tem permissão para acessar esta refeição.', status: 403 }
  }
  return { refeicao }
}

// POST /refeicoes -> registrar refeição (regra 3)
export function criarRefeicao(req, res) {
  const erro = validarRefeicao(req.body)
  if (erro) return res.status(400).json({ erro })

  const { nome, descricao, dataHora, dentroDaDieta } = req.body
  const banco = lerBanco()

  const novaRefeicao = {
    id: randomUUID(),
    usuarioId: req.usuario.id, // liga a refeição ao usuário dono dela
    nome,
    descricao,
    dataHora,
    dentroDaDieta,
  }

  banco.refeicoes.push(novaRefeicao)
  salvarBanco(banco)

  return res.status(201).json(novaRefeicao)
}

// GET /refeicoes -> listar todas as refeições do usuário (regra 6)
export function listarRefeicoes(req, res) {
  const banco = lerBanco()

  // só pega as que são do usuário logado
  const minhas = banco.refeicoes.filter((r) => r.usuarioId === req.usuario.id)

  // deixo as mais recentes primeiro
  minhas.sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora))

  return res.json(minhas)
}

// GET /refeicoes/:id -> ver uma refeição só (regra 7)
export function buscarRefeicao(req, res) {
  const banco = lerBanco()
  const resultado = buscarRefeicaoDoUsuario(banco, req.params.id, req.usuario.id)

  if (resultado.erro) {
    return res.status(resultado.status).json({ erro: resultado.erro })
  }
  return res.json(resultado.refeicao)
}

// PUT /refeicoes/:id -> editar refeição (regra 4)
export function editarRefeicao(req, res) {
  const banco = lerBanco()
  const resultado = buscarRefeicaoDoUsuario(banco, req.params.id, req.usuario.id)

  if (resultado.erro) {
    return res.status(resultado.status).json({ erro: resultado.erro })
  }

  const erro = validarRefeicao(req.body)
  if (erro) return res.status(400).json({ erro })

  const { nome, descricao, dataHora, dentroDaDieta } = req.body
  const refeicao = resultado.refeicao

  // troca todas as informações (o id e o dono continuam os mesmos)
  refeicao.nome = nome
  refeicao.descricao = descricao
  refeicao.dataHora = dataHora
  refeicao.dentroDaDieta = dentroDaDieta

  salvarBanco(banco)
  return res.json(refeicao)
}

// DELETE /refeicoes/:id -> apagar refeição (regra 5)
export function apagarRefeicao(req, res) {
  const banco = lerBanco()
  const resultado = buscarRefeicaoDoUsuario(banco, req.params.id, req.usuario.id)

  if (resultado.erro) {
    return res.status(resultado.status).json({ erro: resultado.erro })
  }

  // filter de novo, mas agora mantendo todas MENOS a que quero apagar
  banco.refeicoes = banco.refeicoes.filter((r) => r.id !== req.params.id)
  salvarBanco(banco)

  return res.status(204).send() // 204 = deu certo e não tem nada pra devolver
}

// GET /refeicoes/metricas -> métricas do usuário (regra 8)
export function metricasUsuario(req, res) {
  const banco = lerBanco()
  const minhas = banco.refeicoes.filter((r) => r.usuarioId === req.usuario.id)

  return res.json(calcularMetricas(minhas))
}
