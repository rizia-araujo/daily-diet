// ============================================================
// api.js
// Todas as conversas com o backend ficam aqui, num lugar só.
// Assim, se o endereço da API mudar, eu mexo só neste arquivo.
// ============================================================
const URL_BASE = 'http://localhost:3333'

// Função genérica que faz a requisição.
// Ela sempre manda o id do usuário no header x-user-id (se estiver logado).
async function requisicao(caminho, opcoes = {}) {
  const usuarioId = localStorage.getItem('usuarioId')

  const resposta = await fetch(URL_BASE + caminho, {
    ...opcoes,
    headers: {
      'Content-Type': 'application/json',
      ...(usuarioId ? { 'x-user-id': usuarioId } : {}),
    },
  })

  // 204 = apagou com sucesso, não vem corpo nenhum
  if (resposta.status === 204) return null

  const dados = await resposta.json()

  // se o backend devolveu erro (400, 404...), eu "lanço" o erro
  // e quem chamou a função trata com try/catch
  if (!resposta.ok) {
    throw new Error(dados.erro || 'Erro na requisição')
  }
  return dados
}

// ---- usuários ----
export const criarUsuario = (nome, email) =>
  requisicao('/usuarios', { method: 'POST', body: JSON.stringify({ nome, email }) })

export const entrar = (email) =>
  requisicao('/usuarios/login', { method: 'POST', body: JSON.stringify({ email }) })

// ---- refeições ----
export const listarRefeicoes = () => requisicao('/refeicoes')
export const buscarRefeicao = (id) => requisicao(`/refeicoes/${id}`)
export const buscarMetricas = () => requisicao('/refeicoes/metricas')

export const criarRefeicao = (dados) =>
  requisicao('/refeicoes', { method: 'POST', body: JSON.stringify(dados) })

export const editarRefeicao = (id, dados) =>
  requisicao(`/refeicoes/${id}`, { method: 'PUT', body: JSON.stringify(dados) })

export const apagarRefeicao = (id) =>
  requisicao(`/refeicoes/${id}`, { method: 'DELETE' })
