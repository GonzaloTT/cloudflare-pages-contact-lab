import './Services.css';

const services = [
  {
    id: 'installation',
    title: 'Instalación de canalones',
    description:
      'Sistemas diseñados de acuerdo con las dimensiones y necesidades específicas de cada propiedad.',
  },
  {
    id: 'maintenance',
    title: 'Limpieza y mantenimiento',
    description:
      'Retiramos residuos y revisamos el sistema para mantener un flujo adecuado durante la temporada de lluvias.',
  },
  {
    id: 'protection',
    title: 'Protección contra residuos',
    description:
      'Instalamos soluciones que ayudan a reducir la acumulación de hojas, ramas y otros materiales.',
  },
  {
    id: 'repair',
    title: 'Inspección y reparación',
    description:
      'Identificamos filtraciones, uniones deterioradas y problemas de nivelación para corregirlos oportunamente.',
  },
];

function ServiceIcon({ type }) {
  const iconPaths = {
    installation: (
      <>
        <path d="M4 10 12 4l8 6" />
        <path d="M6.5 11v8h11v-8" />
        <path d="M4 11h16v3H4z" />
        <path d="M18 14v5" />
      </>
    ),
    maintenance: (
      <>
        <path d="M7 4v4" />
        <path d="M17 4v4" />
        <path d="M4 9h16" />
        <rect x="4" y="6" width="16" height="14" rx="2" />
        <path d="m8 14 2.5 2.5L16 11" />
      </>
    ),
    protection: (
      <>
        <path d="M12 3 5 6v5c0 4.5 2.8 8.2 7 10 4.2-1.8 7-5.5 7-10V6l-7-3Z" />
        <path d="m8.5 12 2.2 2.2 4.8-4.8" />
      </>
    ),
    repair: (
      <>
        <path d="M14 6a4 4 0 0 0-5.3 5.3L4 16l4 4 4.7-4.7A4 4 0 0 0 18 10l-3 3-4-4 3-3Z" />
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
      {iconPaths[type]}
    </svg>
  );
}

function ArrowIcon() {
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
      <path d="M4 10h12" />
      <path d="m11 5 5 5-5 5" />
    </svg>
  );
}

function Services() {
  return (
    <section className="services section" id="servicios">
      <div className="container">
        <div className="services__heading">
          <div>
            <p className="services__eyebrow">Nuestros servicios</p>

            <h2>Soluciones para controlar y aprovechar mejor el agua</h2>
          </div>

          <p className="services__introduction">
            Evaluamos cada propiedad para recomendar una solución adecuada,
            desde una instalación nueva hasta el mantenimiento de un sistema
            existente.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, index) => (
            <article className="service-card" key={service.id}>
              <div className="service-card__top">
                <span className="service-card__number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="service-card__icon">
                  <ServiceIcon type={service.id} />
                </span>
              </div>

              <h3 className="service-card__title">{service.title}</h3>

              <p className="service-card__description">
                {service.description}
              </p>

              <a className="service-card__link" href="#contacto">
                Solicitar información
                <ArrowIcon />
              </a>
            </article>
          ))}
        </div>

        <div className="services__callout">
          <div>
            <p className="services__callout-label">
              ¿No sabes qué solución necesitas?
            </p>

            <p className="services__callout-text">
              Cuéntanos sobre tu propiedad y te ayudaremos a identificar el
              servicio adecuado.
            </p>
          </div>

          <a className="button button--primary" href="#contacto">
            Recibir asesoría
          </a>
        </div>
      </div>
    </section>
  );
}

export default Services;