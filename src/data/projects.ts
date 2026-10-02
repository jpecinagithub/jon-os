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
    slug: 'accounting-academy',
    featured: true,
    title: 'Accounting Standards Academy',
    tagline: {
      es: 'Portal de aprendizaje de normativa contable: NIIF e informes financieros',
      en: 'Accounting standards learning portal: IFRS & financial reporting',
    },
    url: 'https://accounting-standards-academy.vercel.app/',
    repo: 'https://github.com/jpecinagithub/accounting-standards-academy',
    status: 'shipped',
    role: { es: 'Diseño y desarrollo completo', en: 'Full design & development' },
    date: { es: '2026', en: '2026' },
    problem: {
      es: 'Dominar las NIIF y el reporting financiero exige práctica constante: teoría, asientos, impacto en estados y casos reales, todo en un solo lugar.',
      en: 'Mastering IFRS and financial reporting takes constant practice: theory, journal entries, statement impact and real cases, all in one place.',
    },
    did: {
      es: [
        '40 módulos en 9 niveles: NIIF vs GAAP, estados financieros, NIIF 15/16/9, NIC 36/37/12/2/16/38, consolidación, ratios, ESG y auditoría.',
        '393 preguntas de quiz con explicaciones y repaso de errores.',
        'Simuladores interactivos: laboratorio de asientos, impacto en estados y cierre de mes.',
        'Glosario de 52 términos, casos prácticos y preguntas de entrevista.',
      ],
      en: [
        '40 modules across 9 levels: IFRS vs GAAP, financial statements, IFRS 15/16/9, IAS 36/37/12/2/16/38, consolidation, ratios, ESG and audit.',
        '393 quiz questions with explanations and mistake review.',
        'Interactive simulators: journal-entry lab, statement-impact lab and month-end close.',
        '52-term glossary, practical cases and interview questions.',
      ],
    },
    stack: ['React', 'Vite', 'TypeScript', 'localStorage'],
    outcome: {
      es: 'Portal completo en producción, en inglés, con modo claro/oscuro y progreso guardado en local.',
      en: 'Complete portal live in production, in English, with light/dark mode and locally saved progress.',
    },
    shots: shot('accounting-academy/shot1.png', 'accounting-academy/shot2.png', 'accounting-academy/shot3.png'),
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
  {
    slug: 'lumacut',
    featured: false,
    title: 'LumaCut',
    tagline: {
      es: 'Editor de vídeo online que funciona 100% en el navegador',
      en: 'Online video editor that runs 100% in the browser',
    },
    url: 'https://video-editor-three-lake.vercel.app/',
    repo: null,
    status: 'shipped',
    role: { es: 'Diseño y desarrollo completo', en: 'Full design & development' },
    date: { es: '2026', en: '2026' },
    problem: {
      es: 'Editar vídeos sencillos no debería exigir instalar software ni subir material privado a un servidor.',
      en: 'Editing simple videos should not require installing software or uploading private footage to a server.',
    },
    did: {
      es: [
        'Subida de MP4/MOV/WebM (botón, multiselección, arrastrar y soltar) con timeline visual: bloques proporcionales, reordenar, buscar y transiciones.',
        'Fundidos reales entre clips (xfade de vídeo + acrossfade de audio) con previsualización fiel antes de exportar.',
        '3 pistas de música procedural originales (Calm, Positive, Cinematic) con volúmenes independientes.',
        'Exportación real a MP4 (H.264 + AAC, hasta 1080p) con ffmpeg.wasm: los archivos nunca salen del dispositivo.',
      ],
      en: [
        'MP4/MOV/WebM upload (button, multi-select, drag & drop) with a visual timeline: proportional blocks, reorder, seek and transitions.',
        'Real crossfades between clips (video xfade + audio acrossfade) with faithful preview before export.',
        '3 original procedural music tracks (Calm, Positive, Cinematic) with independent volumes.',
        'Real MP4 export (H.264 + AAC, up to 1080p) via ffmpeg.wasm: files never leave the device.',
      ],
    },
    stack: ['React', 'TypeScript', 'Tailwind', 'ffmpeg.wasm', 'Web Audio'],
    outcome: {
      es: 'Editor completo en producción con proyecto demo que genera 3 clips al vuelo.',
      en: 'Complete editor live in production with a demo project that generates 3 clips on the fly.',
    },
    shots: shot('clipcraft/shot1.png', 'clipcraft/shot2.png', 'clipcraft/shot3.png'),
  },
];
