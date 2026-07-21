export interface ManualProcess {
  title: string;
  fragment: string;
}

export interface ManualCategory {
  label: string;
  path: string;
  processes?: ManualProcess[];
}

export const MANUAL_NAV: ManualCategory[] = [
  {
    label: 'Introducción',
    path: '/intro',
  },
  {
    label: '1. Caja de registro',
    path: '/caja-registro/vista-general',
    processes: [
      { title: 'Inyectar agua del comité hacia la casa principal', fragment: 'proceso-a' },
      { title: 'Inyectar agua del comité hacia la casa mayordomo', fragment: 'proceso-b' },
      { title: 'Llenar tanques con agua del comité', fragment: 'proceso-c' },
    ],
  },
  {
    label: '2. Represa',
    path: '/represa/vista-general',
    processes: [
      { title: 'Lavado del filtro', fragment: 'proceso-lavado-filtro' },
    ],
  },
  {
    label: '3. Planta de potabilización',
    path: '/potabilizacion/planta',
    processes: [
      { title: 'Lavado de los filtros', fragment: 'proceso-lavado-filtros' },
      { title: 'Dosificación', fragment: 'proceso-dosificacion' },
    ],
  },
  {
    label: '4. Planta de Hidroflow',
    path: '/hidroflow/planta',
    processes: [
      { title: 'Suspensión de agua en casa principal', fragment: 'proceso-suspension-casa-principal' },
      { title: 'Suspensión de agua en casa mayordomo', fragment: 'proceso-suspension-casa-mayordomo' },
      { title: 'Suspensión de agua total', fragment: 'proceso-suspension-total' },
    ],
  },
  {
    label: '5. Planta de gas',
    path: '/gas/planta',
    processes: [
      { title: 'Inyección de gas', fragment: 'proceso-inyeccion-gas' },
    ],
  },
  {
    label: '6. Calentadores',
    path: '/calentadores/vista-general',
  },
  {
    label: '7. Mantenimiento',
    path: '/mantenimiento/rutinas',
  },
  {
    label: '8. Emergencias',
    path: '/emergencias/protocolos',
  },
];

export interface ProcessStage {
  n: string;
  title: string;
  desc: string;
  path: string;
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    n: '01',
    title: 'Caja de registro',
    desc: 'Caja de registro y control de la fuente de agua.',
    path: '/caja-registro/vista-general',
  },
  {
    n: '02',
    title: 'Represa',
    desc: 'Represa de almacenamiento de agua cruda.',
    path: '/represa/vista-general',
  },
  {
    n: '03',
    title: 'Potabilización',
    desc: 'Floculación, filtración y desinfección del agua.',
    path: '/potabilizacion/planta',
  },
  {
    n: '04',
    title: 'Planta de Hidroflow',
    desc: 'Sistema de tratamiento Hidroflow.',
    path: '/hidroflow/planta',
  },
  {
    n: '05',
    title: 'Planta de gas',
    desc: 'Planta de gas de la finca.',
    path: '/gas/planta',
  },
  {
    n: '06',
    title: 'Calentadores',
    desc: 'Calentadores de agua para los puntos de consumo.',
    path: '/calentadores/vista-general',
  },
];

export interface QuickLink {
  title: string;
  desc: string;
  path: string;
}

export const QUICK_LINKS: QuickLink[] = [
  {
    title: 'Mantenimiento',
    desc: 'Rutinas de limpieza y calendario de revisiones.',
    path: '/mantenimiento/rutinas',
  },
  {
    title: 'Emergencias',
    desc: 'Protocolos ante fallas o contaminación del agua.',
    path: '/emergencias/protocolos',
  },
];
