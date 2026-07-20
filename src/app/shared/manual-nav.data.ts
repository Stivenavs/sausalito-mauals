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
      { title: 'A. Inyectar agua del comité hacia la casa principal', fragment: 'proceso-a' },
      { title: 'B. Inyectar agua del comité hacia la casa mayordomo', fragment: 'proceso-b' },
      { title: 'C. Llenar tanques con agua del comité', fragment: 'proceso-c' },
    ],
  },
  {
    label: '2. Represa',
    path: '/represa/vista-general',
  },
  {
    label: '3. Planta de potabilización',
    path: '/potabilizacion/planta',
  },
  {
    label: '4. Planta de Hidroflow',
    path: '/hidroflow/planta',
  },
  {
    label: '5. Planta de gas',
    path: '/gas/planta',
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
  {
    label: '9. Anexos',
    path: '/anexos/planos-fotos-videos',
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
