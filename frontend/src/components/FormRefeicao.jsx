import { useState } from 'react'

// Formulário usado tanto para CRIAR quanto para EDITAR.
// Reaproveitar o mesmo componente evita código repetido.
// props:
//   valorInicial -> dados já preenchidos (na edição) ou vazio (na criação)
//   aoEnviar     -> função que o pai manda para salvar
//   textoBotao   -> texto do botão ("Salvar", "Cadastrar"...)
export default function FormRefeicao({ valorInicial, aoEnviar, textoBotao }) {
  // um state pra cada campo do formulário
  const [nome, setNome] = useState(valorInicial.nome)
  const [descricao, setDescricao] = useState(valorInicial.descricao)
  const [dataHora, setDataHora] = useState(valorInicial.dataHora)
  const [dentroDaDieta, setDentroDaDieta] = useState(valorInicial.dentroDaDieta)
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)

  async function handleSubmit(evento) {
    evento.preventDefault() // não deixa a página recarregar
    setErro('')
    setSalvando(true)

    try {
      // chama a função do pai passando os dados
      await aoEnviar({ nome, descricao, dataHora, dentroDaDieta })
    } catch (e) {
      setErro(e.message) // mostra o erro que veio do backend
      setSalvando(false)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Nome
        <input value={nome} onChange={(e) => setNome(e.target.value)} required />
      </label>

      <label>
        Descrição
        <textarea rows="3" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
      </label>

      <label>
        Data e hora
        <input type="datetime-local" value={dataHora} onChange={(e) => setDataHora(e.target.value)} required />
      </label>

      <fieldset className="form__dieta">
        <legend>Está dentro da dieta?</legend>
        <label className="form__radio">
          <input type="radio" name="dieta" checked={dentroDaDieta === true} onChange={() => setDentroDaDieta(true)} />
          Sim
        </label>
        <label className="form__radio">
          <input type="radio" name="dieta" checked={dentroDaDieta === false} onChange={() => setDentroDaDieta(false)} />
          Não
        </label>
      </fieldset>

      {erro && <p className="erro" role="alert">{erro}</p>}

      <button type="submit" className="botao" disabled={salvando}>
        {salvando ? 'Salvando...' : textoBotao}
      </button>
    </form>
  )
}
