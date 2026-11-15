import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { buscarRefeicao, apagarRefeicao } from '../services/api.js'
import { formatarData } from '../components/CardRefeicao.jsx'

// Mostra UMA refeição com todos os detalhes (regra 7)
export default function DetalheRefeicao() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [refeicao, setRefeicao] = useState(null)
  const [erro, setErro] = useState('')

  useEffect(() => {
    buscarRefeicao(id)
      .then(setRefeicao)
      .catch((e) => setErro(e.message))
  }, [id])

  async function handleApagar() {
    if (!window.confirm('Tem certeza que quer apagar esta refeição?')) return
    try {
      await apagarRefeicao(id)
      navigate('/')
    } catch (e) {
      setErro(e.message)
    }
  }

  if (erro) return <p className="erro">{erro}</p>
  if (!refeicao) return <p>Carregando...</p>

  return (
    <section className="card card--detalhe">
      <h1>{refeicao.nome}</h1>
      <span className={refeicao.dentroDaDieta ? 'selo selo--dentro' : 'selo selo--fora'}>
        {refeicao.dentroDaDieta ? 'Dentro da dieta' : 'Fora da dieta'}
      </span>
      <p className="card__data">{formatarData(refeicao.dataHora)}</p>
      <p>{refeicao.descricao}</p>

      <div className="card__acoes">
        <Link className="botao botao--contorno" to="/">Voltar</Link>
        <Link className="botao" to={`/refeicao/${id}/editar`}>Editar</Link>
        <button className="botao botao--perigo" onClick={handleApagar}>Apagar</button>
      </div>
    </section>
  )
}
