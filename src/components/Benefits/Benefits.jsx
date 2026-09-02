import './Benefits.css';

const benefits = [
  {
    id: 'prevention',
    title: 'Protección preventiva',
    description:
      'Una conducción adecuada del agua ayuda a reducir la exposición de muros, techos y cimientos a la humedad.',
  },
  {
    id: 'custom',
    title: 'Soluciones a la medida',
    description:
      'Consideramos las dimensiones, pendientes y condiciones de cada propiedad antes de recomendar un sistema.',
  },
  {
    id: 'durability',
    title: 'Materiales resistentes',
    description:
      'Seleccionamos componentes preparados para soportar la exposición constante al sol, la lluvia y los cambios de clima.',
  },
];

const highlights = [
  'Evaluación de la propiedad',
  'Instalación cuidadosamente nivelada',
  'Comunicación durante el servicio',
  'Recomendaciones de mantenimiento',
];

function BenefitIcon({ type }) {
  const paths = {
    prevention: (
      <>
        <path d="M12 3 5 6v5c0 4.5 2.8 8.2 7 10 4.2-1.8 7-5.5 7-10V6l-7-3Z" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </>
    ),
    custom: (
      <>
        <path d="M4 19V7l8-4 8 4v12" />
        <path d="M8 19v-6h8v6" />
        <path d="M3 19h18" />
        <path d="M8 9h.01M12 9h.01M16 9h.01" />
      </>
    ),
    durability: (
      <>
        <path d="M14 6a4 4 0 0 0-5.3 5.3L4 16l4 4 4.7-4.7A4 4 0 0 0 18 10l-3 3-4-4 3-3Z" />
        <path d="m6 16 2 2" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m4 10 4 4 8-8" />
    </svg>
  );
}

function Benefits() {
  return (
    <section className="benefits section" id="beneficios">
      <div className="container">
        <div className="benefits__heading">
          <div>
            <p className="benefits__eyebrow">Por qué elegirnos</p>

            <h2>Más que canalones: una solución para cuidar tu propiedad</h2>
          </div>

          <p className="benefits__introduction">
            Nuestro enfoque busca controlar correctamente el agua y facilitar
            el mantenimiento del sistema a largo plazo.
          </p>
        </div>

        <div className="benefits__grid">
          {benefits.map((benefit) => (
            <article className="benefit-card" key={benefit.id}>
              <span className="benefit-card__icon">
                <BenefitIcon type={benefit.id} />
              </span>

              <h3>{benefit.title}</h3>

              <p>{benefit.description}</p>
            </article>
          ))}
        </div>

        <div className="benefits__summary">
          <div className="benefits__summary-content">
            <p className="benefits__summary-label">
              Atención en cada etapa
            </p>

            <h3>Un servicio planeado para ofrecer claridad y confianza</h3>

            <p>
              Desde la primera conversación hasta la revisión final, te
              mantenemos informado sobre el trabajo y las decisiones del
              proyecto.
            </p>
          </div>

          <ul className="benefits__highlights">
            {highlights.map((highlight) => (
              <li key={highlight}>
                <span>
                  <CheckIcon />
                </span>

                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Benefits;