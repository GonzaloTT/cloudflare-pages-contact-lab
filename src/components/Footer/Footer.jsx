import './Footer.css';

const navigationLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Contacto', href: '#contacto' },
];

const serviceLinks = [
  'Instalación de canalones',
  'Limpieza y mantenimiento',
  'Protección contra residuos',
  'Inspección y reparación',
];

function FooterLogo() {
  return (
    <a
      className="footer__logo"
      href="#inicio"
      aria-label="FlowGuard, volver al inicio"
    >
      <svg
        className="footer__logo-mark"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          d="M7 22.5 24 9l17 13.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />

        <path
          d="M11 25h26v5H11z"
          fill="currentColor"
        />

        <path
          d="M36 30v5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="4"
        />

        <path
          d="M40 39c0 2.2-1.8 4-4 4s-4-1.8-4-4c0-2.4 4-6.5 4-6.5s4 4.1 4 6.5Z"
          fill="var(--color-accent-500)"
        />
      </svg>

      <span>
        Flow<strong>Guard</strong>
      </span>
    </a>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <FooterLogo />

            <p>
              Soluciones de canalización pluvial diseñadas para ayudar a
              proteger y conservar tu propiedad.
            </p>

            <a className="button footer__contact-button" href="#contacto">
              Solicitar información
            </a>
          </div>

          <nav className="footer__navigation" aria-label="Navegación secundaria">
            <p className="footer__column-title">Navegación</p>

            <ul>
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__services">
            <p className="footer__column-title">Servicios</p>

            <ul>
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a href="#contacto">{service}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__contact">
            <p className="footer__column-title">Contacto</p>

            <address>
              <a href="tel:+524420000000">
                +52 442 000 0000
              </a>

              <a href="mailto:contacto@flowguard.mx">
                contacto@flowguard.mx
              </a>

              <span>
                Querétaro, México
              </span>

              <span>
                Lunes a viernes
                <br />
                9:00–18:00
              </span>
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {currentYear} FlowGuard. Sitio demostrativo para prácticas de
            desarrollo y despliegue.
          </p>

          <a href="#inicio">
            Volver al inicio
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;