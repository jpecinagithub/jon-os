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
    slug: 'ateneo',
    featured: false,
    title: 'ATENEO',
    tagline: {
      es: 'Trivial de cultura general en español, sin backend',
      en: 'Spanish general-knowledge trivia, no backend',
    },
    url: null, // public Vercel URL serves stale code — link repo only
    repo: 'https://github.com/jpecinagithub/ateneo',
    status: 'code',
    role: { es: 'Diseño y desarrollo completo', en: 'Full design & development' },
    date: { es: '2026', en: '2026' },
    problem: {
      es: 'Un trivial de cultura general en español que funcione sin backend y sin conexión tras la primera carga, con preguntas que enseñen de verdad.',
      en: 'A Spanish general-knowledge quiz that works with no backend and offline after first load, with questions that actually teach.',
    },
    did: {
      es: [
        '200 preguntas en español (Intermedio y Avanzado), con 4 opciones y explicación.',
        'Modos exprés (10) y clásica (25), temporizador de 10 s y puntuación por velocidad y racha.',
        'Ranking local top-10 y 8 preguntas de audio con motivos clásicos vía Web Audio.',
        'Estética carbón oscuro + dorado champán, responsive móvil/tablet.',
      ],
      en: [
        '200 Spanish questions (Intermediate & Advanced), 4 options + explanation each.',
        'Express (10) and classic (25) modes, 10s timer, speed + streak scoring.',
        'Local top-10 leaderboard and 8 audio questions with classical motifs via Web Audio.',
        'Dark-charcoal + champagne-gold aesthetic, mobile/tablet responsive.',
      ],
    },
    stack: ['Vite', 'React', 'Web Audio', 'localStorage'],
    outcome: {
      es: 'Juego completo sin backend: 200 preguntas verificadas con explicaciones y ranking persistente.',
      en: 'Complete backend-free game: 200 verified questions with explanations and a persistent leaderboard.',
    },
    shots: shot('ateneo/shot1.png', 'ateneo/shot2.png'),
  },
  {
    slug: 'memora',
    featured: false,
    title: 'MEMORA',
    tagline: {
      es: 'Entrena tu memoria a diario, jugando',
      en: 'Train your memory daily, by playing',
    },
    url: null,
    repo: 'https://github.com/jpecinagithub/memora',
    status: 'code',
    role: { es: 'Diseño y desarrollo completo', en: 'Full design & development' },
    date: { es: 'Oct 2026', en: 'Oct 2026' },
    problem: {
      es: 'Entrenar la memoria a diario con sesiones cortas, medibles y sin fricción — marca e identidad 100% originales.',
      en: 'Training memory daily with short, measurable, frictionless sessions — 100% original branding and identity.',
    },
    did: {
      es: [
        '9 juegos de memoria en español con sesiones de 2–4 minutos.',
        'Dificultad adaptativa, rutina diaria determinista de 3 juegos y rachas.',
        'Índice de memoria 0–100 con anillo de progreso, XP y niveles.',
        'PWA instalable con service worker: funciona sin conexión.',
      ],
      en: [
        '9 Spanish memory games with 2–4 minute sessions.',
        'Adaptive difficulty, deterministic daily 3-game workout and streaks.',
        '0–100 memory index with progress ring, XP and levels.',
        'Installable PWA with service worker: works offline.',
      ],
    },
    stack: ['React 18', 'TypeScript', 'Vite', 'PWA', 'Web Audio'],
    outcome: {
      es: '9 juegos verificados y pulidos; cero peticiones de red en ejecución.',
      en: '9 verified, polished games; zero runtime network requests.',
    },
    shots: shot('memora/shot1.png', 'memora/shot2.png'),
  },
  {
    slug: 'jobradar',
    featured: false,
    title: 'JOBRADAR',
    tagline: {
      es: 'Busca menos. Encuentra mejor.',
      en: 'Search less. Find better.',
    },
    url: null,
    repo: 'https://github.com/jpecinagithub/jobradar',
    status: 'code',
    role: { es: 'Diseño y desarrollo completo', en: 'Full design & development' },
    date: { es: 'Oct 2026', en: 'Oct 2026' },
    problem: {
      es: 'Buscar empleo remoto sin perder horas entre portales: un índice que agregue ofertas reales con datos honestos, sin inventar salarios ni requisitos.',
      en: 'Hunting remote jobs without losing hours across portals: an index aggregating real postings with honest data — never inventing salaries or requirements.',
    },
    did: {
      es: [
        'Indexa tableros ATS reales (Greenhouse, Lever, SmartRecruiters, Ashby) y páginas de carrera.',
        'Filtros duros vs. blandos, puntuación explicable y deduplicación agresiva.',
        'Kanban de candidaturas, empleos guardados y panel de analítica.',
        'Bóveda local cifrada (AES-GCM) para fuentes privadas; jamás inventa datos.',
      ],
      en: [
        'Indexes real ATS boards (Greenhouse, Lever, SmartRecruiters, Ashby) and career pages.',
        'Hard vs. soft filters, explainable match scores, aggressive dedup.',
        'Applications Kanban, saved jobs and analytics dashboard.',
        'Encrypted local vault (AES-GCM) for private sources; never invents data.',
      ],
    },
    stack: ['React', 'TypeScript', 'Tailwind', 'Zustand', 'Recharts'],
    outcome: {
      es: '11 tableros verificados indexados (786 ofertas, 0 campos inventados) con errores honestos.',
      en: '11 verified boards indexed (786 jobs, 0 invented fields) with honest errors.',
    },
    shots: shot('jobradar/shot1.png', 'jobradar/shot2.png'),
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
];
