function Pilar({ icono, titulo, texto }) {
  return (
    <article className="pilar">
      <span className="pilar__icono">{icono}</span>
      <h3 className="pilar__titulo">{titulo}</h3>
      <p className="pilar__texto">{texto}</p>
    </article>
  )
}

export default Pilar