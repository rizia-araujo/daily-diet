import { Link } from 'react-router-dom'

// formata a data pro jeito brasileiro (ex: 14/11/2026 12:30)
export function formatarData(dataHora) {
  return new Date(dataHora).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

// Card de UMA refeição na lista.
// props: refeicao (os dados) e aoApagar (função que o pai passa)
export default function CardRefeicao({ refeicao, aoApagar }) {
  return (
    <article className="card">
      <div className="card__topo">
        <h3>{refeicao.nome}</h3>
        {/* a classe muda conforme está dentro ou fora da dieta */}
        <span className={refeicao.dentroDaDieta ? 'selo selo--dentro' : 'selo selo--fora'}>
          {refeicao.dentroDaDieta ? 'Dentro da dieta' : 'Fora da dieta'}
        </span>
      </div>

      <p className="card__data">{formatarData(refeicao.dataHora)}</p>
      <p>{refeicao.descricao}</p>

      <div className="card__acoes">
        <Link className="botao botao--contorno" to={`/refeicao/${refeicao.id}`}>Ver</Link>
        <Link className="botao botao--contorno" to={`/refeicao/${refeicao.id}/editar`}>Editar</Link>
        <button className="botao botao--perigo" onClick={() => aoApagar(refeicao.id)}>Apagar</button>
      </div>
    </article>
  )
}
