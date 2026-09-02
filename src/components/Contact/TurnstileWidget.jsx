import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

const turnstileScriptUrl =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let turnstileScriptPromise;

function loadTurnstileScript() {
  if (window.turnstile) {
    return Promise.resolve(window.turnstile);
  }

  if (turnstileScriptPromise) {
    return turnstileScriptPromise;
  }

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      `script[src="${turnstileScriptUrl}"]`,
    );

    const handleLoad = () => {
      if (window.turnstile) {
        resolve(window.turnstile);
        return;
      }

      turnstileScriptPromise = undefined;
      reject(new Error('Turnstile no quedó disponible.'));
    };

    const handleError = () => {
      turnstileScriptPromise = undefined;
      reject(new Error('No fue posible cargar Turnstile.'));
    };

    if (existingScript) {
      existingScript.addEventListener('load', handleLoad, { once: true });
      existingScript.addEventListener('error', handleError, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = turnstileScriptUrl;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });
    document.head.append(script);
  });

  return turnstileScriptPromise;
}

const TurnstileWidget = forwardRef(function TurnstileWidget(
  { siteKey, onVerify, onExpire, onError },
  ref,
) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      reset() {
        if (window.turnstile && widgetIdRef.current !== null) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }),
    [],
  );

  useEffect(() => {
    let cancelled = false;

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) {
          return;
        }

        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action: 'contact',
          theme: 'light',
          size: 'flexible',
          callback: onVerify,
          'expired-callback': onExpire,
          'error-callback': onError,
        });
      })
      .catch(() => {
        if (!cancelled) {
          onError();
        }
      });

    return () => {
      cancelled = true;

      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onError, onExpire, onVerify, siteKey]);

  return <div ref={containerRef} />;
});

export default TurnstileWidget;
