import { useEffect, useState } from 'react';
import './Header.css';

const navigationItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="container header__inner">
        <a
          className="header__logo"
          href="#inicio"
          aria-label="FlowGuard, ir al inicio"
          onClick={closeMenu}
        >
          <svg
            className="header__logo-mark"
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
              rx="2.5"
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

          <span className="header__logo-text">
            Flow<span>Guard</span>
          </span>
        </a>

        <button
          className={`header__menu-button ${
            isMenuOpen ? 'header__menu-button--open' : ''
          }`}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`header__nav ${
            isMenuOpen ? 'header__nav--open' : ''
          }`}
          aria-label="Navegación principal"
        >
          <ul className="header__nav-list">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  className="header__nav-link"
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}

            <li className="header__cta-item">
              <a
                className="button button--primary header__cta"
                href="#contacto"
                onClick={closeMenu}
              >
                Solicitar cotización
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;