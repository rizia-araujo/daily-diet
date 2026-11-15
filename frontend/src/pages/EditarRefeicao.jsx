import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { buscarRefeicao, editarRefeicao } from '../services/api.js'
import FormRefeicao from '../components/FormRefeicao.jsx'

export default function EditarRefeicao() {
  const { id } = useParams() // pega o :id que está na URL
  const navigate = useNavigate()
  const [refeicao, setRefeicao] = useState(null)
  const [erro, setErro] = useState('')

  // busca a refeição atual pra preencher o formulário
  useEffect(() => {
    buscarRefeicao(id)
      .then(setRefeicao)
      .catch((e) => setErro(e.message))
  }, [id])

  async function salvar(dados) {
    await editarRefeicao(id, dados)
    navigate(`/refeicao/${id}`) // vai para a página de detalhe
  }

  if (erro) return <p className="erro">{erro}</p>
  if (!refeicao) return <p>Carregando...</p>

  return (
    <section>
      <h1>Editar refeição</h1>
      <FormRefeicao valorInicial={refeicao} aoEnviar={salvar} textoBotao="Salvar alterações" />
    </section>
  )
}
