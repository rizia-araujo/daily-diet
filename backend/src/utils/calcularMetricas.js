// ============================================================
// calcularMetricas
// Recebe a lista de refeições de UM usuário e devolve as métricas
// pedidas na atividade (regra 8).
// ============================================================
export function calcularMetricas(refeicoes) {
  const total = refeicoes.length

  // filter = "filtra" só as que atendem a condição
  const dentroDaDieta = refeicoes.filter((r) => r.dentroDaDieta === true).length
  const foraDaDieta = refeicoes.filter((r) => r.dentroDaDieta === false).length

  // Para a melhor sequência eu preciso das refeições em ordem de data.
  // [...refeicoes] faz uma cópia, pra não bagunçar o array original.
  const ordenadas = [...refeicoes].sort(
    (a, b) => new Date(a.dataHora) - new Date(b.dataHora)
  )

  let melhorSequencia = 0 // o recorde
  let sequenciaAtual = 0 // quantas seguidas estou contando agora

  for (const refeicao of ordenadas) {
    if (refeicao.dentroDaDieta) {
      sequenciaAtual = sequenciaAtual + 1 // continuou na dieta, soma 1
      if (sequenciaAtual > melhorSequencia) {
        melhorSequencia = sequenciaAtual // bateu o recorde
      }
    } else {
      sequenciaAtual = 0 // saiu da dieta, zera a contagem
    }
  }

  return { total, dentroDaDieta, foraDaDieta, melhorSequencia }
}
