import { useState } from 'react'
import { criarUsuario, entrar } from '../services/api.js'

// Tela de criar conta / entrar. Recebe aoEntrar do App.
export default function Entrar({ aoEntrar }) {
  const [modo, setModo] = useState('entrar') // 'entrar' ou 'criar'
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [erro, setErro] = useState('')

  async function handleSubmit(evento) {
    evento.preventDefault()
    setErro('')
    try {
      let usuario
      if (modo === 'criar') {
        // o id precisa estar salvo ANTES das próximas requisições
        usuario = await criarUsuario(nome, email)
      } else {
        usuario = await entrar(email)
      }
      aoEntrar(usuario) // avisa o App que logou
    } catch (e) {
      setErro(e.message)
    }
  }

  return (
    <div className="entrar">
      <form className="form entrar__caixa" onSubmit={handleSubmit}>
        <h1>🥗 Daily Diet</h1>
        <p>{modo === 'criar' ? 'Crie sua conta' : 'Entre com seu email'}</p>

        {/* o campo nome só aparece quando está criando conta */}
        {modo === 'criar' && (
          <label>
            Nome
            <input value={nome} onChange={(e) => setNome(e.target.value)} required />
          </label>
        )}

        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        {erro && <p className="erro" role="alert">{erro}</p>}

        <button className="botao" type="submit">
          {modo === 'criar' ? 'Criar conta' : 'Entrar'}
        </button>

        <button
          type="button"
          className="link"
          onClick={() => { setModo(modo === 'criar' ? 'entrar' : 'criar'); setErro('') }}
        >
          {modo === 'criar' ? 'Já tenho conta' : 'Quero criar uma conta'}
        </button>
      </form>
    </div>
  )
}
