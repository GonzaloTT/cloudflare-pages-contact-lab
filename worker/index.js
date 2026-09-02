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

function escapeHtml(value) {
  const characters = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return value.replace(/[&<>"']/g, (character) => characters[character]);
}

function createEmailContent(data, requestId) {
  const safeData = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone),
    service: escapeHtml(data.service),
    message: escapeHtml(data.message),
  };

  const submittedAt = new Date().toISOString();

  const html = `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Nueva solicitud de FlowGuard</title>
      </head>

      <body style="margin:0; padding:24px; background:#f7f9fa; font-family:Arial,Helvetica,sans-serif; color:#142129;">
        <div style="max-width:640px; margin:0 auto; overflow:hidden; border:1px solid #dbe2e6; border-radius:16px; background:#ffffff;">
          <div style="padding:24px; background:#062f38; color:#ffffff;">
            <p style="margin:0 0 8px; color:#77c2cf; font-size:12px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">
              Formulario web
            </p>

            <h1 style="margin:0; font-size:24px;">
              Nueva solicitud de contacto
            </h1>
          </div>

          <div style="padding:24px;">
            <p style="margin:0 0 24px; color:#66747d;">
              Se recibió una nueva solicitud desde la landing de FlowGuard.
            </p>

            <table role="presentation" style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0; border-bottom:1px solid #edf1f3; color:#66747d; font-size:13px;">
                  Nombre
                </td>

                <td style="padding:12px 0; border-bottom:1px solid #edf1f3; text-align:right; font-weight:700;">
                  ${safeData.name}
                </td>
              </tr>

              <tr>
                <td style="padding:12px 0; border-bottom:1px solid #edf1f3; color:#66747d; font-size:13px;">
                  Correo
                </td>

                <td style="padding:12px 0; border-bottom:1px solid #edf1f3; text-align:right; font-weight:700;">
                  ${safeData.email}
                </td>
              </tr>

              <tr>
                <td style="padding:12px 0; border-bottom:1px solid #edf1f3; color:#66747d; font-size:13px;">
                  Teléfono
                </td>

                <td style="padding:12px 0; border-bottom:1px solid #edf1f3; text-align:right; font-weight:700;">
                  ${safeData.phone}
                </td>
              </tr>

              <tr>
                <td style="padding:12px 0; border-bottom:1px solid #edf1f3; color:#66747d; font-size:13px;">
                  Servicio
                </td>

                <td style="padding:12px 0; border-bottom:1px solid #edf1f3; text-align:right; font-weight:700;">
                  ${safeData.service}
                </td>
              </tr>
            </table>

            <div style="padding:16px; margin-top:24px; border-left:4px solid #f59e0b; border-radius:8px; background:#f7f9fa;">
              <p style="margin:0 0 8px; color:#66747d; font-size:13px; font-weight:700;">
                Mensaje
              </p>

              <p style="margin:0; white-space:pre-wrap; line-height:1.6;">
                ${safeData.message}
              </p>
            </div>

            <div style="margin-top:24px; color:#66747d; font-size:12px;">
              <p style="margin:0 0 4px;">
                Identificador: ${requestId}
              </p>

              <p style="margin:0;">
                Fecha UTC: ${submittedAt}
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Nueva solicitud de contacto de FlowGuard

Nombre: ${data.name}
Correo: ${data.email}
Teléfono: ${data.phone}
Servicio: ${data.service}

Mensaje:
${data.message}

Identificador: ${requestId}
Fecha UTC: ${submittedAt}
  `.trim();

  return {
    html,
    text,
  };
}

async function sendContactEmail(data, env, requestId) {
  const { html, text } = createEmailContent(data, requestId);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Idempotency-Key': requestId,
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: data.email,
      subject: `[FlowGuard] Nueva solicitud: ${data.service}`,
      html,
      text,
    }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.id) {
    throw new Error(`Resend responded with status ${response.status}.`);
  }

  return result.id;
}

async function handleContactRequest(request, env) {
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

  let rawBody;

  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse(
      {
        success: false,
        message: 'No fue posible leer la solicitud.',
      },
      400,
    );
  }

  const bodySize = new TextEncoder().encode(rawBody).byteLength;

  if (bodySize > maxBodySize) {
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
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse(
      {
        success: false,
        message: 'La solicitud contiene JSON inválido.',
      },
      400,
    );
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return jsonResponse(
      {
        success: false,
        message: 'La solicitud debe contener un objeto JSON.',
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

  if (
    !env.RESEND_API_KEY ||
    !env.CONTACT_TO_EMAIL ||
    !env.CONTACT_FROM_EMAIL
  ) {
    return jsonResponse(
      {
        success: false,
        message: 'El servicio de correo no está configurado.',
      },
      500,
    );
  }

  const requestId = crypto.randomUUID();

  try {
    await sendContactEmail(data, env, requestId);
  } catch (error) {
    console.error('Contact email delivery failed.', {
      requestId,
      reason:
        error instanceof Error
          ? error.message
          : 'Unknown email delivery error.',
    });

    return jsonResponse(
      {
        success: false,
        requestId,
        message:
          'No fue posible enviar la solicitud. Inténtalo nuevamente más tarde.',
      },
      502,
    );
  }

  return jsonResponse({
    success: true,
    requestId,
    message:
      'Tu solicitud fue enviada correctamente. Nos pondremos en contacto contigo.',
  });
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
      return handleContactRequest(request, env);
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