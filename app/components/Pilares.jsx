import Pilar from './Pilar'

function Pilares() {
  const pilares = [
    {
      id: 1,
      icono: '👥',
      titulo: 'Colaboración',
      texto:
        'Nos integramos a cada proyecto para avanzar junto a nuestros clientes hacia sus objetivos.',
    },
    {
      id: 2,
      icono: '📊',
      titulo: 'ESTRATEGIA',
      texto:
        'Diseñamos soluciones visuales alineadas con los objetivos y el crecimiento de cada marca.',
    },
    {
      id: 3,
      icono: '⚙️',
      titulo: 'CREATIVIDAD',
      texto:
        'Transformamos ideas en propuestas originales, funcionales y coherentes con cada identidad.',
    },
    {
      id: 4,
      icono: '📄',
      titulo: 'COMUNICACIÓN',
      texto:
        'Desarrollamos contenidos y piezas visuales que comunican mensajes de manera clara y atractiva.',
    },
  ]

  return (
    <section className="pilares">
      <div className="pilares__contenedor">
        {pilares.map((pilar) => (
          <Pilar
            key={pilar.id}
            icono={pilar.icono}
            titulo={pilar.titulo}
            texto={pilar.texto}
          />
        ))}
      </div>
    </section>
  )
}

export default Pilares