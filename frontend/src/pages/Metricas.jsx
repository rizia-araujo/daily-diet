import { useEffect, useState } from 'react'
import { buscarMetricas } from '../services/api.js'
import CardMetrica from '../components/CardMetrica.jsx'

// Página com os 4 números pedidos na regra 8
export default function Metricas() {
  const [metricas, setMetricas] = useState(null)
  const [erro, setErro] = useState('')

  useEffect(() => {
    buscarMetricas()
      .then(setMetricas)
      .catch((e) => setErro(e.message))
  }, [])

  if (erro) return <p className="erro">{erro}</p>
  if (!metricas) return <p>Carregando...</p>

  return (
    <section>
      <h1>Minhas métricas</h1>
      <div className="grade grade--metricas">
        <CardMetrica titulo="Total de refeições" valor={metricas.total} />
        <CardMetrica titulo="Dentro da dieta" valor={metricas.dentroDaDieta} cor="verde" />
        <CardMetrica titulo="Fora da dieta" valor={metricas.foraDaDieta} cor="vermelho" />
        <CardMetrica titulo="Melhor sequência dentro da dieta" valor={metricas.melhorSequencia} cor="verde" />
      </div>
    </section>
  )
}
