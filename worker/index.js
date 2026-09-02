const allowedServices = new Set([
  'Instalación de canalones',
  'Limpieza y mantenimiento',
  'Protección contra residuos',
  'Inspección y reparación',
  'No estoy seguro',
]);

const maxBodySize = 12_000;

function jsonResponse(payload, status = 200, additionalHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...additionalHeaders,
    },
  });
}

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function validateContactData(body) {
  const data = {
    name: normalizeText(body.name),
    email: normalizeText(body.email).toLowerCase(),
    phone: normalizeText(body.phone),
    service: normalizeText(body.service),
    message: normalizeText(body.message),
    consent: body.consent === true,
  };

  const errors = {};

  if (data.name.length < 2 || data.name.length > 80) {
    errors.name = 'El nombre debe contener entre 2 y 80 caracteres.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(data.email) || data.email.length > 120) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }

  const phoneDigits = data.phone.replace(/\D/g, '');

  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = 'Ingresa un número telefónico válido.';
  }

  if (!allowedServices.has(data.service)) {
    errors.service = 'Selecciona un servicio válido.';
  }

  if (data.message.length < 10 || data.message.length > 1000) {
    errors.message = 'El mensaje debe contener entre 10 y 1000 caracteres.';
  }

  if (!data.consent) {
    errors.consent = 'Debes aceptar el uso de tus datos.';
  }

  return {
    data: {
      ...data,
      phone: phoneDigits,
    },
    errors,
  };
}

async function handleContactRequest(request) {
  if (request.method !== 'POST') {
    return jsonResponse(
      {
        success: false,
        message: 'Método no permitido.',
      },
      405,
      {
        Allow: 'POST',
      },
    );
  }

  const contentType = request.headers.get('Content-Type') || '';

  if (!contentType.includes('application/json')) {
    return jsonResponse(
      {
        success: false,
        message: 'El contenido debe enviarse como JSON.',
      },
      415,
    );
  }

  const contentLength = Number(request.headers.get('Content-Length') || 0);

  if (contentLength > maxBodySize) {
    return jsonResponse(
      {
        success: false,
        message: 'La solicitud supera el tamaño permitido.',
      },
      413,
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      {
        success: false,
        message: 'La solicitud contiene JSON inválido.',
      },
      400,
    );
  }

  /*
   * Campo honeypot.
   * Los usuarios reales no deberán llenarlo.
   */
  if (normalizeText(body.website)) {
    return jsonResponse(
      {
        success: true,
        message: 'Solicitud recibida correctamente.',
      },
      202,
    );
  }

  const { data, errors } = validateContactData(body);

  if (Object.keys(errors).length > 0) {
    return jsonResponse(
      {
        success: false,
        message: 'Revisa los campos del formulario.',
        errors,
      },
      400,
    );
  }

  const requestId = crypto.randomUUID();

  /*
   * En el siguiente commit de backend utilizaremos estos datos
   * para enviar el correo mediante Resend.
   *
   * No registramos los datos personales en console.log.
   */
  void data;

  return jsonResponse(
    {
      success: true,
      requestId,
      message:
        'Los datos fueron validados. El envío por correo todavía no está conectado.',
    },
    202,
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      if (request.method !== 'GET') {
        return jsonResponse(
          {
            success: false,
            message: 'Método no permitido.',
          },
          405,
          {
            Allow: 'GET',
          },
        );
      }

      return jsonResponse({
        success: true,
        service: 'flowguard-contact-api',
        status: 'healthy',
        timestamp: new Date().toISOString(),
      });
    }

    if (url.pathname === '/api/contact') {
      return handleContactRequest(request);
    }

    if (url.pathname.startsWith('/api/')) {
      return jsonResponse(
        {
          success: false,
          message: 'Ruta de API no encontrada.',
        },
        404,
      );
    }

    return env.ASSETS.fetch(request);
  },
};