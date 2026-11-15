// Cartãozinho que mostra um número grande + um título.
// props: titulo, valor e (opcional) cor
export default function CardMetrica({ titulo, valor, cor }) {
  return (
    <div className={`metrica ${cor ? 'metrica--' + cor : ''}`}>
      <span className="metrica__valor">{valor}</span>
      <span className="metrica__titulo">{titulo}</span>
    </div>
  )
}
