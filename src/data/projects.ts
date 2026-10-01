import type { Lang } from '../os/types';

export interface Project {
  slug: string;
  featured: boolean;
  title: string;
  tagline: Record<Lang, string>;
  url: string | null;
  repo: string | null;
  status: 'shipped' | 'code' | 'dev';
  role: Record<Lang, string>;
  date: Record<Lang, string>;
  problem: Record<Lang, string>;
  did: Record<Lang, string[]>;
  stack: string[];
  outcome: Record<Lang, string>;
  shots: string[];
}

const B = import.meta.env.BASE_URL || './';
const shot = (...names: string[]) => names.map((n) => `${B}shots/${n}`);

/* Live URLs were verified reachable with curl on 2026-10-02 unless noted. */
export const PROJECTS: Project[] = [
  {
    slug: 'neon-escape',
    featured: true,
    title: 'NEON ESCAPE',
    tagline: {
      es: 'Arcade de conducción 3D en un mundo synthwave',
      en: '3D arcade driving in a synthwave world',
    },
    url: null, // no confirmed live URL — link the repo instead
    repo: 'https://github.com/jpecinagithub/neon-escape',
    status: 'code',
    role: { es: 'Diseño y desarrollo completo', en: 'Full design & development' },
    date: { es: 'Sep 2026 — Actualidad', en: 'Sep 2026 — Present' },
    problem: {
      es: 'Quería un arcade de conducción 3D que se sintiera rápido y espectacular sin necesidad de backend: todo —física, IA, música y mando— debía correr en el navegador.',
      en: 'I wanted a 3D driving arcade that felt fast and spectacular with no backend: everything — physics, AI, music, gamepad — had to run in the browser.',
    },
    did: {
      es: [
        'Reconversión del gameplay a peatones: respeta a los azules (niño, abuela, embarazada), atropella a los rojos (ladrón, punk) por 500 pts y decide con los skaters.',
        'Conducción arcade con derrape, nitro, colisiones a cámara lenta y sistema de combos con puntuación por casi-roce.',
        'Garaje con 4 coches desbloqueables y ranking local top-10 con entrada de nombre.',
        'Mando de PlayStation con vibración, tutorial de 5 pasos en español y controles de teclado.',
        'Banda sonora synthwave generada en el navegador con Web Audio (sin ficheros de audio).',
      ],
      en: [
        'Gameplay reconversion to pedestrians: spare the BLUE ones (kid, grandma, pregnant woman), run over the RED ones (thief, punk) for 500 pts, judge the skaters.',
        'Arcade driving with drift, nitro, slow-motion collisions and a combo system with near-miss scoring.',
        'Garage with 4 unlockable cars and a local top-10 leaderboard with name entry.',
        'PlayStation controller with rumble, 5-step Spanish tutorial and keyboard controls.',
        'Synthwave soundtrack generated in-browser with Web Audio (no audio files).',
      ],
    },
    stack: ['Vite', 'React', 'Three.js', 'JavaScript', 'Web Audio', 'Gamepad API', 'localStorage'],
    outcome: {
      es: 'Juego completo y verificado con 14 tests de lógica: bucle jugable de menú a ranking sin un solo error de consola.',
      en: 'Complete game verified with 14 logic tests: a playable loop from menu to leaderboard with zero console errors.',
    },
    shots: shot('neon-escape/shot1.png', 'neon-escape/shot2.png', 'neon-escape/shot3.png'),
  },
  {
    slug: 'velocity-rush',
    featured: true,
    title: 'VELOCITY RUSH',
    tagline: {
      es: 'Carreras arcade 3D: 3 modos, 6 coches, 3 circuitos',
      en: '3D arcade racing: 3 modes, 6 cars, 3 tracks',
    },
    url: 'https://velocity-rush-one.vercel.app/',
    repo: 'https://github.com/jpecinagithub/velocity-rush',
    status: 'shipped',
    role: { es: 'Diseño y desarrollo completo', en: 'Full design & development' },
    date: { es: 'Oct 2026', en: 'Oct 2026' },
    problem: {
      es: 'Un arcade de carreras 3D completo: 3 modos de juego, 6 coches originales y 3 circuitos, con sensación real de velocidad y controles precisos de teclado y mando.',
      en: 'A complete 3D arcade racer: 3 game modes, 6 original cars and 3 tracks, with a real sense of speed and precise keyboard + gamepad controls.',
    },
    did: {
      es: [
        '3 modos: Circuito (2 vueltas, 6 pilotos), Sprint punto a punto con tráfico y Contrarreloj con récords locales.',
        '6 coches originales (APEX ONE desbloqueable al ganar) y 3 circuitos: AZURE COAST, THUNDER RIDGE y NEON BAY.',
        'Derrape, nitro, rebufo y puntos por casi-roce; 3 dificultades de IA y cámaras de persecución/capó.',
        'Récords top-10 por circuito con nombre de piloto en la pantalla de resultados.',
        'Bucle musical de 132 BPM sintetizado con Web Audio y calidad gráfica ajustable.',
      ],
      en: [
        '3 modes: Circuit (2 laps, 6 racers), point-to-point Sprint with traffic, and Time Trial with local records.',
        '6 original cars (APEX ONE unlockable by winning) and 3 tracks: AZURE COAST, THUNDER RIDGE, NEON BAY.',
        'Drift, nitro, slipstream and near-miss points; 3 AI difficulties and chase/hood cameras.',
        'Per-track top-10 records with pilot nickname on the results screen.',
        '132 BPM synthesized music loop via Web Audio and adjustable graphics quality.',
      ],
    },
    stack: ['Vite', 'React 19', 'Three.js', 'React Three Fiber', 'Zustand', 'Web Audio', 'Gamepad API'],
    outcome: {
      es: '78/78 tests de lógica superados; verificado en Firefox con WebGL por software y cero errores de consola.',
      en: '78/78 logic tests passing; verified in Firefox with software WebGL and zero console errors.',
    },
    shots: shot('velocity-rush/shot1.png', 'velocity-rush/shot2.png', 'velocity-rush/shot3.png'),
  },
  {
    slug: 'futbol3d',
    featured: true,
    title: 'Fútbol 3D',
    tagline: {
      es: 'Simulador de partidos 11 contra 11 en 3D',
      en: '3D 11-vs-11 football match simulator',
    },
    url: 'https://futbol-3d-v2.vercel.app/',
    repo: null,
    status: 'shipped',
    role: { es: 'Diseño y desarrollo completo', en: 'Full design & development' },
    date: { es: '2026', en: '2026' },
    problem: {
      es: 'Simular partidos de fútbol 11 contra 11 en 3D dentro del navegador, con ambiente de estadio y narrativa de retransmisión televisiva.',
      en: 'Simulating 3D 11-vs-11 football matches in the browser, with stadium atmosphere and TV-broadcast storytelling.',
    },
    did: {
      es: [
        'Estadio Aurora en 3D con partidos 11 contra 11 en tiempo real.',
        'Selección de equipos local/visitante, cartel del partido y revisión de alineaciones.',
        'Marcador y minuto en vivo, radar táctico y múltiples cámaras.',
        'Modos partido, entrenamiento y opciones; controles de teclado.',
      ],
      en: [
        '3D Aurora Stadium with real-time 11-vs-11 matches.',
        'Home/away team selection, match poster and lineup review.',
        'Live scoreboard and clock, tactical radar and multiple cameras.',
        'Match, training and options modes; keyboard controls.',
      ],
    },
    stack: ['Three.js', 'JavaScript', 'Web Audio', '3D en tiempo real'],
    outcome: {
      es: 'Simulador jugable de principio a fin: del cartel del partido al pitido final.',
      en: 'Playable simulator end to end: from the match poster to the final whistle.',
    },
    shots: shot('futbol3d/shot1.png', 'futbol3d/shot2.png', 'futbol3d/shot3.png'),
  },
  {
    slug: 'tsla',
    featured: true,
    title: 'TSLA Trading Agent',
    tagline: {
      es: 'Trading algorítmico sobre Tesla con datos en vivo',
      en: 'Algorithmic trading on Tesla with live data',
    },
    url: 'http://143.47.63.169/tsla/',
    repo: null,
    status: 'shipped',
    role: { es: 'Diseño y desarrollo completo', en: 'Full design & development' },
    date: { es: '2026', en: '2026' },
    problem: {
      es: 'Operar con criterio cuantitativo sobre Tesla: señales objetivas, backtesting riguroso y control del riesgo antes de arriesgar capital real.',
      en: 'Trading Tesla with quantitative criteria: objective signals, rigorous backtesting and risk control before risking real capital.',
    },
    did: {
      es: [
        '4 estrategias: EMA, Momentum, VWAP y ADT ejecutándose sobre el mismo motor.',
        'Velas de mercado en vivo vía REST + WebSocket e indicadores (EMA 9/21, RSI 14, VWAP).',
        'Paper trading con historial de operaciones, motivos de salida y curva de capital.',
        'Backtesting, optimizador de parámetros, comparador de estrategias y distribución de PnL.',
      ],
      en: [
        '4 strategies — EMA, Momentum, VWAP, ADT — running on the same engine.',
        'Live market candles via REST + WebSocket and indicators (EMA 9/21, RSI 14, VWAP).',
        'Paper trading with trade history, exit reasons and equity curve.',
        'Backtesting, parameter optimizer, strategy comparison and PnL distribution.',
      ],
    },
    stack: ['Python', 'REST API', 'WebSocket', 'Backtesting', 'Análisis cuantitativo'],
    outcome: {
      es: 'Panel en producción en VPS propio, ingiriendo datos en vivo y generando señales auditables.',
      en: 'Dashboard live on my own VPS, ingesting live data and generating auditable signals.',
    },
    shots: shot('tsla/dashboard.webp', 'tsla/trades.webp', 'tsla/performance.webp'),
  },
  {
    slug: 'erp3',
    featured: true,
    title: 'ERP Enterprise',
    tagline: {
      es: 'Sistema de planificación de recursos empresariales',
      en: 'Enterprise resource planning system',
    },
    url: 'http://143.47.63.169/erp3/login',
    repo: null,
    status: 'shipped',
    role: { es: 'Diseño y desarrollo completo', en: 'Full design & development' },
    date: { es: '2026', en: '2026' },
    problem: {
      es: 'Un ERP modular y bilingüe para pymes: accesible desde cualquier dispositivo, rápido y agradable de usar en modo oscuro.',
      en: 'A modular, bilingual ERP for SMBs: accessible from any device, fast and pleasant to use in dark mode.',
    },
    did: {
      es: [
        'Frontend React + Vite consumiendo API REST con autenticación por tokens.',
        'Internacionalización ES/EN completa y modo oscuro.',
        'Módulos de gestión con vistas de detalle y navegación fluida.',
        'Diseño responsive: usable en escritorio y móvil.',
      ],
      en: [
        'React + Vite frontend consuming a REST API with token authentication.',
        'Full ES/EN internationalization and dark mode.',
        'Management modules with detail views and fluid navigation.',
        'Responsive design: usable on desktop and mobile.',
      ],
    },
    stack: ['React', 'Vite', 'REST API', 'JWT', 'i18n ES/EN'],
    outcome: {
      es: 'Sistema desplegado en VPS y accesible en producción con login funcional.',
      en: 'System deployed on a VPS and live in production with working login.',
    },
    shots: shot('erp3/login.webp', 'erp3/detalle.webp', 'erp3/idioma.webp'),
  },
  {
    slug: 'pixel-quest',
    featured: false,
    title: 'PIXEL QUEST',
    tagline: {
      es: 'Plataformas 2D de IP original: el reino perdido',
      en: 'Original-IP 2D platformer: the lost kingdom',
    },
    url: null,
    repo: 'https://github.com/jpecinagithub/pixel-quest-the-lost-kingdom',
    status: 'code',
    role: { es: 'Diseño y desarrollo completo', en: 'Full design & development' },
    date: { es: '2026', en: '2026' },
    problem: {
      es: 'Un plataformas 2D de IP 100% original —sin material protegido— con 20 niveles planificados, progresión y guardado persistente.',
      en: 'A 100% original-IP 2D platformer — no protected material — with 20 planned levels, progression and persistent saves.',
    },
    did: {
      es: [
        'Milo contra Grimfang: 5 mundos × (3 niveles + jefe) planificados.',
        'Mundos 1-1 y 1-2 terminados y verificados (38/38 comprobaciones, cero errores).',
        'Salto variable, stomps, bloques, power-ups, secretos, checkpoints y jefes.',
        'Canvas + Web Audio + mando; ranking top-10 y partidas en localStorage.',
      ],
      en: [
        'Milo vs. Grimfang: 5 worlds × (3 levels + boss) planned.',
        'Worlds 1-1 and 1-2 finished and verified (38/38 checks, zero errors).',
        'Variable jump, stomps, blocks, power-ups, secrets, checkpoints and bosses.',
        'Canvas + Web Audio + gamepad; top-10 leaderboard and saves in localStorage.',
      ],
    },
    stack: ['Vite', 'React', 'JavaScript', 'Canvas', 'Web Audio', 'Gamepad API'],
    outcome: {
      es: 'Dos mundos jugables de principio a fin con mapa de nodos y niveles bloqueados por delante.',
      en: 'Two worlds playable end to end, with a node map and locked levels ahead.',
    },
    shots: shot('pixel-quest/shot1.png', 'pixel-quest/shot2.png'),
  },
  {
    slug: 'dustline',
    featured: false,
    title: 'DUSTLINE',
    tagline: {
      es: 'FPS militar realista en el navegador',
      en: 'Realistic military FPS for the browser',
    },
    url: null,
    repo: null, // no public repo confirmed
    status: 'dev',
    role: { es: 'Diseño y desarrollo completo', en: 'Full design & development' },
    date: { es: '2026', en: '2026' },
    problem: {
      es: 'Un FPS militar realista en el navegador: armas con pegada, iluminación cuidada y un primer mapa vertical jugable antes de escalar.',
      en: 'A realistic military FPS for the browser: punchy weapons, crafted lighting and a playable vertical-slice map before scaling up.',
    },
    did: {
      es: [
        'Vertical slice "Desert Strike" (50×50 m) con físicas Rapier.',
        'Sensación de arma, audio posicional y postprocesado cinematográfico.',
        'Soporte de mando con panel de diagnóstico y ejes bloqueables.',
        'HUD táctico y diseño de mapa orientado a cobertura.',
      ],
      en: [
        '"Desert Strike" vertical slice (50×50 m) with Rapier physics.',
        'Weapon feel, positional audio and cinematic postprocessing.',
        'Gamepad support with diagnostics panel and lockable axes.',
        'Tactical HUD and cover-oriented map design.',
      ],
    },
    stack: ['React', 'TypeScript', 'Three.js', 'React Three Fiber', 'Rapier'],
    outcome: {
      es: 'Vertical slice jugable; iterando mecánicas con playtesting real.',
      en: 'Playable vertical slice; iterating mechanics with real playtesting.',
    },
    shots: shot('dustline/shot1.png', 'dustline/shot2.png'),
  },
  {
    slug: 'ai-academy',
    featured: true,
    title: 'AI FUNDAMENTALS ACADEMY',
    tagline: {
      es: 'Portal de aprendizaje de IA: 28 módulos, 252 preguntas reales',
      en: 'AI learning portal: 28 modules, 252 real questions',
    },
    url: 'https://ai-fundamentals-academy.vercel.app/',
    repo: 'https://github.com/jpecinagithub/ai-fundamentals-academy',
    status: 'shipped',
    role: { es: 'Diseño y desarrollo completo', en: 'Full design & development' },
    date: { es: 'Oct 2026', en: 'Oct 2026' },
    problem: {
      es: 'Quería un portal para aprender fundamentos de IA de verdad: contenido real y riguroso, práctica interactiva y seguimiento del progreso — sin backend y sin cuentas.',
      en: 'I wanted a portal to genuinely learn AI fundamentals: real, rigorous content, interactive practice and progress tracking — with no backend and no accounts.',
    },
    did: {
      es: [
        '28 módulos con contenido redactado a mano y 252 preguntas validadas (9 por módulo, 4 opciones + explicación).',
        '11 simuladores interactivos (tokenizador, temperatura, RAG, embeddings…), repaso de errores y examen final de 50 preguntas.',
        'Constructor de proyecto final, mapa de conocimiento y glosario de 38 términos.',
        'Bilingüe ES/EN completo con cambio instantáneo, modo oscuro y certificado PDF de finalización con código de verificación.',
        'Todo en localStorage: progreso, rachas, XP y niveles sin servidor.',
      ],
      en: [
        '28 modules with hand-written content and 252 validated questions (9 per module, 4 options + explanation).',
        '11 interactive simulators (tokenizer, temperature, RAG, embeddings…), mistake review and a 50-question final exam.',
        'Final project builder, knowledge map and a 38-term glossary.',
        'Full ES/EN bilingual with instant switching, dark mode and a PDF completion certificate with verification code.',
        'Everything in localStorage: progress, streaks, XP and levels with no server.',
      ],
    },
    stack: ['Vite', 'React', 'TypeScript', 'jsPDF', 'localStorage'],
    outcome: {
      es: 'Portal público y desplegado: un curso completo de IA usable desde el primer clic, verificado módulo a módulo sin errores de consola.',
      en: 'Public, deployed portal: a complete AI course usable from the first click, verified module by module with zero console errors.',
    },
    shots: shot('ai-academy/shot1.png', 'ai-academy/shot2.png', 'ai-academy/shot3.png'),
  },
];
