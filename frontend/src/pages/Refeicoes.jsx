import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarRefeicoes, apagarRefeicao } from '../services/api.js'
import CardRefeicao from '../components/CardRefeicao.jsx'

// Página que lista todas as refeições do usuário
export default function Refeicoes() {
  const [refeicoes, setRefeicoes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  // useEffect com [] roda UMA vez quando a página abre.
  // É aqui que eu busco os dados do backend.
  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarRefeicoes()
        setRefeicoes(dados)
      } catch (e) {
        setErro(e.message)
      } finally {
        setCarregando(false) // terminou de carregar (deu certo ou erro)
      }
    }
    carregar()
  }, [])

  async function handleApagar(id) {
    // confirm abre aquela janelinha de "Tem certeza?"
    if (!window.confirm('Tem certeza que quer apagar esta refeição?')) return

    try {
      await apagarRefeicao(id)
      // tiro a refeição apagada da lista na tela, sem precisar buscar de novo
      setRefeicoes(refeicoes.filter((r) => r.id !== id))
    } catch (e) {
      setErro(e.message)
    }
  }

  if (carregando) return <p>Carregando...</p>

  return (
    <section>
      <div className="titulo-linha">
        <h1>Minhas refeições</h1>
        <Link className="botao" to="/nova">+ Nova refeição</Link>
      </div>

      {erro && <p className="erro" role="alert">{erro}</p>}

      {refeicoes.length === 0 ? (
        <p>Você ainda não registrou nenhuma refeição.</p>
      ) : (
        <div className="grade">
          {refeicoes.map((r) => (
            <CardRefeicao key={r.id} refeicao={r} aoApagar={handleApagar} />
          ))}
        </div>
      )}
    </section>
  )
}
