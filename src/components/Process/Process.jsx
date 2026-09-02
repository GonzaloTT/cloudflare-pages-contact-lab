import './Process.css';

const processSteps = [
  {
    number: '01',
    title: 'Evaluación inicial',
    description:
      'Conocemos las características de tu propiedad, el estado actual del sistema y los problemas que deseas resolver.',
  },
  {
    number: '02',
    title: 'Propuesta personalizada',
    description:
      'Definimos la solución, los materiales recomendados y el alcance del servicio de acuerdo con tus necesidades.',
  },
  {
    number: '03',
    title: 'Instalación profesional',
    description:
      'Realizamos el trabajo cuidando la nivelación, las uniones y la correcta conducción del agua.',
  },
  {
    number: '04',
    title: 'Revisión final',
    description:
      'Verificamos el funcionamiento del sistema y compartimos recomendaciones para conservarlo en buenas condiciones.',
  },
];

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

function Process() {
  return (
    <section className="process section" id="proceso">
      <div className="container process__layout">
        <div className="process__introduction">
          <p className="process__eyebrow">Cómo trabajamos</p>

          <h2>Un proceso claro desde la evaluación hasta la instalación</h2>

          <p className="process__description">
            Cada proyecto comienza conociendo la propiedad. Esto nos permite
            proponer una solución adecuada y mantener una comunicación clara
            durante todo el servicio.
          </p>

          <a className="process__link" href="#contacto">
            Iniciar una evaluación
            <ArrowIcon />
          </a>
        </div>

        <ol className="process__steps">
          {processSteps.map((step) => (
            <li className="process-step" key={step.number}>
              <div className="process-step__marker">
                <span>{step.number}</span>
              </div>

              <div className="process-step__content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Process;