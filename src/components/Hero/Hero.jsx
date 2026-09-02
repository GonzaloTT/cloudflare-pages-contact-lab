import './Hero.css';

const benefits = [
  'Instalación profesional',
  'Materiales resistentes',
  'Atención personalizada',
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="m5 10 3 3 7-7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function HeroIllustration() {
  return (
    <div className="hero__visual" aria-hidden="true">
      <div className="hero__illustration-container">
        <svg
          className="hero__illustration"
          viewBox="0 0 640 520"
          role="img"
        >
          <defs>
            <linearGradient id="sky-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d9f0f4" />
              <stop offset="100%" stopColor="#77c2cf" />
            </linearGradient>

            <linearGradient id="house-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#edf1f3" />
            </linearGradient>

            <filter id="house-shadow" x="-20%" y="-20%" width="140%" height="150%">
              <feDropShadow
                dx="0"
                dy="18"
                floodColor="#062f38"
                floodOpacity="0.18"
                stdDeviation="16"
              />
            </filter>
          </defs>

          <rect width="640" height="520" rx="40" fill="url(#sky-gradient)" />

          <circle cx="520" cy="92" r="45" fill="#fbbf24" opacity="0.9" />

          <g fill="#ffffff" opacity="0.7">
            <ellipse cx="130" cy="102" rx="58" ry="23" />
            <ellipse cx="175" cy="100" rx="42" ry="18" />
            <ellipse cx="470" cy="172" rx="45" ry="18" />
            <ellipse cx="505" cy="170" rx="32" ry="14" />
          </g>

          <g filter="url(#house-shadow)">
            <path
              d="M125 274 320 127l195 147v167H125Z"
              fill="url(#house-gradient)"
            />

            <path
              d="m88 283 232-181 232 181-24 31-208-161-208 161Z"
              fill="#0a4b59"
            />

            <path
              d="M115 287h410"
              fill="none"
              stroke="#f59e0b"
              strokeLinecap="round"
              strokeWidth="18"
            />

            <path
              d="M511 288v119c0 20 14 34 34 34h20"
              fill="none"
              stroke="#d97706"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="15"
            />

            <rect
              x="263"
              y="299"
              width="114"
              height="142"
              rx="8"
              fill="#16758a"
            />

            <rect
              x="157"
              y="312"
              width="73"
              height="67"
              rx="6"
              fill="#77c2cf"
            />

            <path
              d="M193.5 312v67M157 345.5h73"
              stroke="#ffffff"
              strokeWidth="6"
            />

            <rect
              x="410"
              y="312"
              width="73"
              height="67"
              rx="6"
              fill="#77c2cf"
            />

            <path
              d="M446.5 312v67M410 345.5h73"
              stroke="#ffffff"
              strokeWidth="6"
            />
          </g>

          <g fill="#16758a">
            <path d="M552 343c0 12-9 21-20 21s-20-9-20-21c0-13 20-36 20-36s20 23 20 36Z" />
            <path
              d="M600 386c0 9-7 16-15 16s-15-7-15-16c0-10 15-28 15-28s15 18 15 28Z"
              opacity="0.7"
            />
          </g>

          <path
            d="M76 441h492"
            fill="none"
            stroke="#0a4b59"
            strokeLinecap="round"
            strokeWidth="10"
            opacity="0.18"
          />
        </svg>

        <div className="hero__floating-card hero__floating-card--top">
          <span className="hero__floating-icon">✓</span>

          <span>
            <strong>Protección confiable</strong>
            <small>Durante todo el año</small>
          </span>
        </div>

        <div className="hero__floating-card hero__floating-card--bottom">
          <span className="hero__status-dot" />

          <span>
            <strong>Servicio disponible</strong>
            <small>Atención personalizada</small>
          </span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero__container">
        <div className="hero__content">
          <p className="hero__eyebrow">
            Protección pluvial para tu propiedad
          </p>

          <h1 className="hero__title">
            Protege tu hogar de la lluvia con soluciones hechas para durar
          </h1>

          <p className="hero__description">
            Instalamos sistemas de canalización eficientes que ayudan a
            controlar el agua, prevenir filtraciones y conservar tu propiedad
            en mejores condiciones.
          </p>

          <div className="hero__actions">
            <a className="button button--primary" href="#contacto">
              Solicitar cotización
            </a>

            <a className="button button--secondary" href="#servicios">
              Conocer servicios
            </a>
          </div>

          <ul className="hero__benefits" aria-label="Beneficios principales">
            {benefits.map((benefit) => (
              <li key={benefit}>
                <span className="hero__check">
                  <CheckIcon />
                </span>

                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <HeroIllustration />
      </div>
    </section>
  );
}

export default Hero;