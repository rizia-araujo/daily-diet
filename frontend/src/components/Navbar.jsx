import { NavLink } from 'react-router-dom'

// props: usuario (pra mostrar o nome) e aoSair (função do botão sair)
export default function Navbar({ usuario, aoSair }) {
  return (
    <header className="navbar">
      <strong className="navbar__logo">🥗 Daily Diet</strong>

      <nav className="navbar__links">
        <NavLink to="/" end>Refeições</NavLink>
        <NavLink to="/nova">Nova refeição</NavLink>
        <NavLink to="/metricas">Métricas</NavLink>
      </nav>

      <div className="navbar__usuario">
        <span>Olá, {usuario.nome}</span>
        <button className="botao botao--contorno" onClick={aoSair}>Sair</button>
      </div>
    </header>
  )
}
