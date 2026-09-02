import './WhatsAppButton.css';

const defaultMessage =
  'Hola, me gustaría recibir información sobre las soluciones de FlowGuard para mi propiedad.';

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.04 3C8.85 3 3 8.78 3 15.88c0 2.55.76 5.04 2.18 7.14L3.75 29l6.14-1.4a13.1 13.1 0 0 0 6.14 1.53H16.04C23.22 29.13 29 23.35 29 16.25 29 9.15 23.22 3 16.04 3Zm0 23.95h-.01a10.9 10.9 0 0 1-5.55-1.5l-.4-.24-3.65.83.87-3.53-.26-.42a10.68 10.68 0 0 1-1.68-5.74c0-5.92 4.83-10.75 10.69-10.75 2.86 0 5.54 1.12 7.55 3.16a10.64 10.64 0 0 1 3.13 7.58c0 5.92-4.78 10.61-10.69 10.61Zm5.87-8.03c-.32-.16-1.9-.93-2.2-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.19.22-.37.24-.69.08-.32-.16-1.35-.49-2.57-1.58a9.72 9.72 0 0 1-1.78-2.19c-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66 0 1.57 1.14 3.08 1.3 3.29.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

function WhatsAppButton() {
  const configuredNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '';
  const whatsappNumber = configuredNumber.replace(/\D/g, '');

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`
    : '#contacto';

  const isConfigured = Boolean(whatsappNumber);

  return (
    <a
      className="whatsapp-button"
      href={whatsappUrl}
      target={isConfigured ? '_blank' : undefined}
      rel={isConfigured ? 'noreferrer' : undefined}
      aria-label={
        isConfigured
          ? 'Contactar a FlowGuard por WhatsApp'
          : 'Ir al formulario de contacto'
      }
      title={
        isConfigured
          ? 'Escríbenos por WhatsApp'
          : 'Configura VITE_WHATSAPP_NUMBER para activar WhatsApp'
      }
    >
      <span className="whatsapp-button__icon">
        <WhatsAppIcon />
      </span>

      <span className="whatsapp-button__label">
        Escríbenos
      </span>
    </a>
  );
}

export default WhatsAppButton;