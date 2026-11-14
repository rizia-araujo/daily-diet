// ============================================================
// database.js
// Aqui eu criei um "banco de dados" bem simples usando um arquivo JSON.
// Em vez de MySQL ou outro banco, eu guardo tudo em data/db.json.
// Assim não precisa instalar nada a mais e os dados não somem
// quando o servidor reinicia.
// ============================================================
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// como estou usando "import" (ES Modules), o __dirname não existe pronto,
// então eu preciso descobrir a pasta atual assim:
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ARQUIVO = path.join(__dirname, '..', 'data', 'db.json')

// lê o arquivo e devolve um objeto { usuarios: [], refeicoes: [] }
export function lerBanco() {
  // se o arquivo ainda não existe, eu crio com as listas vazias
  if (!fs.existsSync(ARQUIVO)) {
    const vazio = { usuarios: [], refeicoes: [] }
    fs.writeFileSync(ARQUIVO, JSON.stringify(vazio, null, 2))
    return vazio
  }
  const texto = fs.readFileSync(ARQUIVO, 'utf-8')
  return JSON.parse(texto) // transforma o texto em objeto
}

// recebe o objeto inteiro e salva de volta no arquivo
export function salvarBanco(banco) {
  fs.writeFileSync(ARQUIVO, JSON.stringify(banco, null, 2))
}
