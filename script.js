const ramos = {
  'PSG114': { nombre: 'Psicología General 1', requisitos: [] },
  'FPF114': { nombre: 'Fund. Psicología Fisiológica', requisitos: [] },
  'RNA114': { nombre: 'Realidad Nacional', requisitos: [] },
  'EAP114': { nombre: 'Estadística Aplicada', requisitos: [] },
  'FIG114': { nombre: 'Filosofía General', requisitos: [] },
  'PSG214': { nombre: 'Psicología General 2', requisitos: ['PSG114'] },
  'MDI114': { nombre: 'Metodología Investigación', requisitos: ['PSG114', 'EAP114'] },
  'IPT114': { nombre: 'Intro a la Psicopatología', requisitos: ['PSG114', 'FPF114'] },
  'PSO114': { nombre: 'Psicología Social', requisitos: ['PSG114', 'FIG114', 'RNA114'] },
  'PIA114': { nombre: 'Psicología Infancia-Adolescencia', requisitos: ['PSG114', 'FPF114', 'RNA114'] },
  'PDT114': { nombre: 'Psicología del Trabajo', requisitos: ['PSG214', 'PSO114'] },
  'MCU114': { nombre: 'Metodología Cualitativa', requisitos: ['MDI114', 'PSO114'] },
  'PSL114': { nombre: 'Psicología de la Salud', requisitos: ['PSG214', 'IPT114', 'PSO114'] },
  'PAU114': { nombre: 'Psicología Persona Adulta', requisitos: ['PSG214', 'PSO114', 'PIA114'] },
  'PPA114': { nombre: 'Psicopatología', requisitos: ['PSG214', 'IPT114', 'PSO114'] },
  'IEP114': { nombre: 'Intro Evaluación Psicológica', requisitos: ['MCU114', 'PPA114', 'PAU114'] },
  'PMN114': { nombre: 'Psicología Comunitaria', requisitos: ['MCU114', 'PPA114', 'PSL114'] },
  'PTG114': { nombre: 'Psicopatología Social', requisitos: ['PPA114', 'PSL114', 'PAU114'] },
  'IPR114': { nombre: 'Psicología de la Personalidad', requisitos: ['PPA114', 'PSL114', 'PAU114'] },
  'PEP114': { nombre: 'Psicología Educativa', requisitos: ['MCU114', 'PAU114'] },
  'EPG114': { nombre: 'Evaluación Psicológica', requisitos: ['PTG114', 'IEP114', 'IPR114'] },
  'IPO114': { nombre: 'Intervención Ps. Social', requisitos: ['PMN114', 'PTG114', 'IPR114'] },
  'PGC114': { nombre: 'Psicología Clínica', requisitos: ['PTG114', 'IEP114', 'IPR114'] },
  'INC114': { nombre: 'Intervención Comunitaria', requisitos: ['PMN114', 'PTG114', 'IPR114'] },
  'PSI114': { nombre: 'Personalidad Social e Individual', requisitos: ['IEP114', 'IPR114'] },
  'EPI114': { nombre: 'Eval. Tratamiento Infantil', requisitos: ['PGC114', 'EPG114'] },
  'PEM114': { nombre: 'Psicología Emergencias', requisitos: ['PGC114', 'INC114', 'IPO114'] },
  'PID114': { nombre: 'Psicoterapia Individual', requisitos: ['PGC114', 'EPG114', 'PSI114'] },
  'FPD114': { nombre: 'Psicología y Discapacidad', requisitos: ['INC114', 'EPG114', 'PSI114'] },
  'PJF114': { nombre: 'Psicología Jurídica', requisitos: ['IPO114', 'EPG114', 'PSI114'] },
  'DPP114': { nombre: 'Diagnóstico Psicopedagógico', requisitos: ['EPI114', 'PID114', 'FPD114'] },
  'PFP114': { nombre: 'Psicoterapia Familiar I', requisitos: ['EPI114', 'PID114', 'FPD114'] },
  'GDP114': { nombre: 'Gestión Personal I', requisitos: ['PDT114', 'EPG114', 'PSI114'] },
  'PGP114': { nombre: 'Psicoterapia Grupal', requisitos: ['PID114', 'PEM114', 'FPD114'] },
  'GDP214': { nombre: 'Gestión Personal II', requisitos: ['GDP114'] },
  'PFP214': { nombre: 'Psicoterapia Familiar II', requisitos: ['PFP114'] },
  'ISP114': { nombre: 'Intervención Psicopedagógica', requisitos: ['DPP114'] },
  'PPF114': { nombre: 'Prácticas Profesionales I', requisitos: [] }, // Requiere 148 UV
  'PPF214': { nombre: 'Prácticas Profesionales II', requisitos: ['PPF114'] },
  'SDI114': { nombre: 'Seminario de Investigación', requisitos: [] } // 148 UV
};

const estado = {}; // Guarda el estado de cada ramo

const contenedor = document.getElementById('malla');

function crearBoton(codigo, ramo) {
  const btn = document.createElement('div');
  btn.classList.add('ramo');
  btn.innerHTML = `<strong>${codigo}</strong><br>${ramo.nombre}`;
  btn.dataset.codigo = codigo;
  contenedor.appendChild(btn);
  estado[codigo] = { aprobado: false, boton: btn };
}

function actualizarBotones() {
  Object.entries(ramos).forEach(([codigo, info]) => {
    const { requisitos } = info;
    const todosAprobados = requisitos.every(req => estado[req]?.aprobado);
    const btn = estado[codigo].boton;

    if (estado[codigo].aprobado) {
      btn.classList.add('aprobado');
      btn.classList.remove('habilitado');
      btn.style.cursor = 'default';
    } else if (todosAprobados || requisitos.length === 0) {
      btn.classList.add('habilitado');
      btn.style.cursor = 'pointer';
    } else {
      btn.classList.remove('habilitado');
      btn.style.cursor = 'not-allowed';
    }
  });
}

function manejarClick(e) {
  const codigo = e.currentTarget.dataset.codigo;
  if (!estado[codigo].boton.classList.contains('habilitado')) return;
  estado[codigo].aprobado = true;
  actualizarBotones();
}

function iniciar() {
  Object.entries(ramos).forEach(([codigo, info]) => {
    crearBoton(codigo, info);
  });

  Object.values(estado).forEach(({ boton }) => {
    boton.addEventListener('click', manejarClick);
  });

  actualizarBotones();
}

iniciar();

