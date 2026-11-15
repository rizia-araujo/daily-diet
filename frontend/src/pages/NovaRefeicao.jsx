import { useNavigate } from 'react-router-dom'
import { criarRefeicao } from '../services/api.js'
import FormRefeicao from '../components/FormRefeicao.jsx'

export default function NovaRefeicao() {
  const navigate = useNavigate() // serve pra mudar de página pelo código

  async function salvar(dados) {
    await criarRefeicao(dados)
    navigate('/') // depois de salvar, volta pra lista
  }

  return (
    <section>
      <h1>Nova refeição</h1>
      <FormRefeicao
        valorInicial={{ nome: '', descricao: '', dataHora: '', dentroDaDieta: true }}
        aoEnviar={salvar}
        textoBotao="Cadastrar"
      />
    </section>
  )
}
