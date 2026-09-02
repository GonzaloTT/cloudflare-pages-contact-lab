import { useState } from 'react';
import './Contact.css';

const serviceOptions = [
  'Instalación de canalones',
  'Limpieza y mantenimiento',
  'Protección contra residuos',
  'Inspección y reparación',
  'No estoy seguro',
];

function ContactIcon({ type }) {
  const paths = {
    phone: (
      <path d="M6.6 3h2.8l1.4 4-2 1.6a15.4 15.4 0 0 0 6.6 6.6l1.6-2 4 1.4v2.8A2.6 2.6 0 0 1 18.4 20C10.4 20 4 13.6 4 5.6A2.6 2.6 0 0 1 6.6 3Z" />
    ),
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
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

function Contact() {
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    setFormMessage(
      'Formulario validado correctamente. El envío por correo se conectará en el siguiente paso.',
    );
  };

  return (
    <section className="contact section" id="contacto">
      <div className="container contact__layout">
        <div className="contact__information">
          <p className="contact__eyebrow">Hablemos de tu proyecto</p>

          <h2>Solicita una evaluación para tu propiedad</h2>

          <p className="contact__description">
            Comparte tus datos y cuéntanos qué necesitas. Revisaremos la
            información para orientarte sobre el servicio más adecuado.
          </p>

          <ul className="contact__details">
            <li>
              <span className="contact__detail-icon">
                <ContactIcon type="phone" />
              </span>

              <span>
                <small>Teléfono de atención</small>
                <strong>+52 442 000 0000</strong>
              </span>
            </li>

            <li>
              <span className="contact__detail-icon">
                <ContactIcon type="email" />
              </span>

              <span>
                <small>Correo electrónico</small>
                <strong>contacto@flowguard.mx</strong>
              </span>
            </li>

            <li>
              <span className="contact__detail-icon">
                <ContactIcon type="clock" />
              </span>

              <span>
                <small>Horario de atención</small>
                <strong>Lunes a viernes, 9:00–18:00</strong>
              </span>
            </li>
          </ul>

          <div className="contact__note">
            <strong>¿Necesitas atención más directa?</strong>
            <p>
              Utiliza el botón de WhatsApp para iniciar una conversación con
              nuestro equipo.
            </p>
          </div>
        </div>

        <div className="contact__form-container">
          <div className="contact__form-heading">
            <h3>Cuéntanos sobre tu propiedad</h3>

            <p id="contact-form-help">
              Los campos marcados con * son obligatorios.
            </p>
          </div>

          <form className="contact-form" aria-describedby="contact-form-help" onSubmit={handleSubmit}>
            <div className="contact-form__grid">
              <div className="form-field">
                <label htmlFor="name">Nombre completo *</label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  minLength="2"
                  maxLength="80"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">Correo electrónico *</label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength="120"
                  placeholder="nombre@correo.com"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone">Teléfono *</label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  minLength="10"
                  maxLength="20"
                  placeholder="442 000 0000"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="service">Servicio de interés *</label>

                <select id="service" name="service" defaultValue="" required>
                  <option value="" disabled>
                    Selecciona una opción
                  </option>

                  {serviceOptions.map((service) => (
                    <option value={service} key={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field form-field--full">
                <label htmlFor="message">¿Cómo podemos ayudarte? *</label>

                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  minLength="10"
                  maxLength="1000"
                  placeholder="Describe brevemente las características de tu propiedad y el servicio que necesitas."
                  required
                />
              </div>
            </div>

            <label className="contact-form__consent">
              <input name="consent" type="checkbox" required />

              <span>
                Acepto que mis datos sean utilizados para responder esta
                solicitud. *
              </span>
            </label>

            <button className="button button--primary contact-form__submit" type="submit">
              Enviar solicitud
            </button>

            {formMessage && (
              <p
                className="contact-form__status"
                role="status"
                aria-live="polite"
              >
                {formMessage}
              </p>
            )}            
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;