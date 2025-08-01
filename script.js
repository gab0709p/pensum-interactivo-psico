const ramos = {
  // PRIMER AÑO
  PSG114: { n:'Psicología General 1', c:1, r:[] },
  FPF114: { n:'Fund. Psicofisiología', c:1, r:[] },
  RNA114: { n:'Realidad Nacional', c:1, r:[] },
  EAP114: { n:'Estadística Aplicada', c:1, r:[] },
  FIG114: { n:'Filosofía General', c:1, r:[] },

  PSG214: { n:'Psicología General 2', c:2, r:['PSG114'] },
  MDI114: { n:'Metodología Investigación', c:2, r:['PSG114','EAP114'] },
  IPT114: { n:'Intro Psicopatología', c:2, r:['PSG114','FPF114'] },
  PSO114: { n:'Psicología Social', c:2, r:['PSG114','FIG114','RNA114'] },
  PIA114: { n:'Psicología Infancia y Adolescencia', c:2, r:['PSG114','FPF114','RNA114'] },

  // SEGUNDO AÑO
  PDT114: { n:'Psicología del Trabajo', c:3, r:['PSG214','PSO114'] },
  MCU114: { n:'Metodología Cualitativa', c:3, r:['MDI114','PSO114'] },
  PSL114: { n:'Psicología de la Salud', c:3, r:['PSG214','IPT114','PSO114'] },
  PAU114: { n:'Psicología de la Persona Adulta', c:3, r:['PSG214','PSO114','PIA114'] },
  PPA114: { n:'Psicopatología', c:3, r:['PSG214','IPT114','PSO114'] },

  IEP114: { n:'Intro Evaluación Psicológica', c:4, r:['MCU114','PPA114','PAU114'] },
  PMN114: { n:'Psicología Comunitaria', c:4, r:['MCU114','PPA114','PSL114'] },
  PTG114: { n:'Psicopatología Social', c:4, r:['PPA114','PSL114','PAU114'] },
  IPR114: { n:'Psicología de la Personalidad', c:4, r:['PPA114','PSL114','PAU114'] },
  PEP114: { n:'Psicología Educativa y del Aprendizaje', c:4, r:['MCU114','PAU114'] },

  // TERCER AÑO
  EPG114: { n:'Evaluación Psicológica', c:5, r:['PTG114','IEP114','IPR114'] },
  IPO114: { n:'Intervención en Psicopatología Social', c:5, r:['PMN114','PTG114','IPR114'] },
  PGC114: { n:'Psicología Clínica', c:5, r:['PTG114','IEP114','IPR114'] },
  INC114: { n:'Intervención Comunitaria', c:5, r:['PMN114','PTG114','IPR114'] },
  PSI114: { n:'Personalidad Social e Individual', c:5, r:['IEP114','IPR114'] },

  EPI114: { n:'Eval. Tratamiento Infantil', c:6, r:['PGC114','EPG114'] },
  PEM114: { n:'Psicología en Situación de Emergencia', c:6, r:['PGC114','INC114','IPO114'] },
  PID114: { n:'Psicoterapia Individual', c:6, r:['PGC114','EPG114','PSI114'] },
  FPD114: { n:'Psicología y Discapacidad', c:6, r:['INC114','EPG114','PSI114'] },
  PJF114: { n:'Psicología Jurídica y Forense', c:6, r:['IPO114','EPG114','PSI114'] },

  // CUARTO AÑO
  DPP114: { n:'Diagnóstico Psicopedagógico', c:7, r:['EPI114','PID114','FPD114'] },
  PFP114: { n:'Psicoterapia Familiar y de Pareja I', c:7, r:['EPI114','PID114','FPD114'] },
  GDP114: { n:'Gestión y Desarrollo de Personal I', c:7, r:['PDT114','EPG114','PSI114'] },
  PGP114: { n:'Psicoterapia Grupal', c:7, r:['PID114','PEM114','FPD114'] },

  GDP214: { n:'Gestión y Desarrollo de Personal II', c:8, r:['GDP114'] },
  PFP214: { n:'Psicoterapia Familiar y de Pareja II', c:8, r:['PFP114'] },
  ISP114: { n:'Intervención Psicopedagógica', c:8, r:['DPP114'] },

  // QUINTO AÑO
  PPF114: { n:'Prácticas Profesionales I', c:9, r:[] }, // Requiere 148 UV
  PPF214: { n:'Prácticas Profesionales II', c:10, r:['PPF114'] },
  SDI114: { n:'Seminario de Investigación', c:10, r:[] } // Requiere 148 UV
};

const estado = {};
const cont = document.getElementById('malla-container');
const cols = {};
const progresoGuardado = JSON.parse(localStorage.getItem('estadoRamos')) || {};

// Crear columnas por ciclo
for (let code in ramos) {
  const { c, n } = ramos[code];
  if (!cols[c]) {
    const div = document.createElement('div');
    div.className = 'ciclo';
    div.innerHTML = `<h2>Ciclo ${c}</h2>`;
    cont.appendChild(div);
    cols[c] = div;
  }

  const divRam = document.createElement('div');
  divRam.className = 'ramo';
  divRam.innerHTML = `${n}`;
  divRam.dataset.code = code;
  cols[c].appendChild(divRam);

  estado[code] = { aprobado: progresoGuardado[code] || false, div: divRam };

  divRam.addEventListener('click', () => {
    if (!divRam.classList.contains('habilitado') && !divRam.classList.contains('aprobado')) return;

    estado[code].aprobado = !estado[code].aprobado;
    guardarEstado();
    actualizar();
  });
}

function actualizar() {
  for (let code in ramos) {
    const info = ramos[code];
    const st = estado[code];
    const div = st.div;
    const ok = info.r.every(req => estado[req]?.aprobado);

    div.classList.remove('habilitado', 'aprobado');
    div.style.cursor = 'not-allowed';

    if (st.aprobado) {
      div.classList.add('aprobado');
      div.style.cursor = 'pointer';
    } else if (ok) {
      div.classList.add('habilitado');
      div.style.cursor = 'pointer';
    }
  }
}

function guardarEstado() {
  const estadoActual = {};
  for (let code in estado) {
    estadoActual[code] = estado[code].aprobado;
  }
  localStorage.setItem('estadoRamos', JSON.stringify(estadoActual));
}

actualizar();
