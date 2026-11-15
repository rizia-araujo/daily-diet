// ============================================================
// App.jsx
// É o "chefe" do front: guarda quem é o usuário logado (state)
// e decide qual página aparece em cada endereço.
// ============================================================
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Entrar from './pages/Entrar.jsx'
import Refeicoes from './pages/Refeicoes.jsx'
import NovaRefeicao from './pages/NovaRefeicao.jsx'
import EditarRefeicao from './pages/EditarRefeicao.jsx'
import DetalheRefeicao from './pages/DetalheRefeicao.jsx'
import Metricas from './pages/Metricas.jsx'

export default function App() {
  // estado do usuário. O valor inicial vem do localStorage,
  // assim se eu atualizar a página (F5) continuo logado.
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem('usuario')
    return salvo ? JSON.parse(salvo) : null
  })

  // chamada quando o usuário cria conta ou entra
  function fazerLogin(dadosUsuario) {
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario))
    localStorage.setItem('usuarioId', dadosUsuario.id)
    setUsuario(dadosUsuario)
  }

  function sair() {
    localStorage.removeItem('usuario')
    localStorage.removeItem('usuarioId')
    setUsuario(null)
  }

  // se NÃO tem usuário logado, só mostra a tela de entrar
  if (!usuario) {
    return <Entrar aoEntrar={fazerLogin} />
  }

  // se tem usuário, mostra o menu + as páginas
  return (
    <>
      <Navbar usuario={usuario} aoSair={sair} />
      <main className="conteudo">
        <Routes>
          <Route path="/" element={<Refeicoes />} />
          <Route path="/nova" element={<NovaRefeicao />} />
          <Route path="/refeicao/:id" element={<DetalheRefeicao />} />
          <Route path="/refeicao/:id/editar" element={<EditarRefeicao />} />
          <Route path="/metricas" element={<Metricas />} />
          {/* qualquer outro endereço volta pra home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  )
}
