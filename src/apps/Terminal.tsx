import { useEffect, useRef, useState } from 'react';
import { useOS } from '../os/store';
import { PROJECTS } from '../data/projects';
import { EMAIL, GITHUB, LINKEDIN } from '../os/types';

interface Line { id: number; kind: 'in' | 'out' | 'err'; text: string }
let lineSeq = 1;

const COMMANDS = ['help', 'about', 'skills', 'projects', 'contact', 'resume', 'whoami', 'date', 'echo', 'clear', 'lang', 'theme', 'fortune', 'matrix', 'sudo', 'hack', 'exit'];

const FORTUNES: Record<string, string[]> = {
  es: [
    'El mejor código es el que no hay que escribir.',
    'Funciona en mi máquina™ — y ahora también en la tuya.',
    'Un bug es solo una feature sin documentar… hasta que la documentas.',
    'Duerme: el bug seguirá ahí mañana, pero tú verás la solución.',
    'Primero hazlo funcionar. Luego hazlo bonito. Luego, si queda tiempo, hazlo rápido.',
    'La IA escribe el borrador; el ingeniero firma la obra.',
  ],
  en: [
    "The best code is the code you don't have to write.",
    'Works on my machine™ — and now on yours too.',
    'A bug is just an undocumented feature… until you document it.',
    "Sleep on it: the bug will still be there tomorrow, but you'll see the fix.",
    "First make it work. Then make it pretty. Then, if there's time, make it fast.",
    'AI writes the draft; the engineer signs the work.',
  ],
};

const KATAKANA = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ0123456789';

export default function TerminalApp() {
  const os = useOS();
  const { t, lang } = os;
  const [lines, setLines] = useState<Line[]>(() =>
    (t('terminal.welcome') as string[]).map((text) => ({ id: lineSeq++, kind: 'out' as const, text }))
  );
  const [input, setInput] = useState('');
  const [hist, setHist] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const firstCmd = useRef(false);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const push = (kind: Line['kind'], text: string) =>
    setLines((ls) => [...ls.slice(-300), { id: lineSeq++, kind, text }]);

  const helpText = (): string => {
    const d: Record<string, [string, string]> = {
      help: ['Muestra esta ayuda', 'Show this help'],
      about: ['Quién es Jon', 'Who Jon is'],
      skills: ['Habilidades técnicas', 'Technical skills'],
      projects: ['Lista los proyectos', 'List the projects'],
      contact: ['Datos de contacto', 'Contact details'],
      resume: ['Abre el currículum', 'Open the resume'],
      whoami: ['Quién eres aquí', 'Who you are here'],
      date: ['Fecha y hora', 'Date and time'],
      echo: ['Repite tu texto', 'Echo your text'],
      clear: ['Limpia la terminal', 'Clear the terminal'],
      lang: ['Cambia ES/EN', 'Toggle ES/EN'],
      theme: ['Cambia oscuro/claro', 'Toggle dark/light'],
      fortune: ['Una galleta de la fortuna dev', 'A dev fortune cookie'],
      matrix: ['Lluvia de código (5 s)', 'Code rain (5 s)'],
      sudo: ['No lo intentes', "Don't try it"],
      hack: ['Modo hacker (de mentira)', 'Hacker mode (fake)'],
      exit: ['Cierra la terminal', 'Close the terminal'],
    };
    const L = lang === 'es' ? 0 : 1;
    return (t('terminal.helpTitle') as string) + '\n' +
      COMMANDS.map((c) => `  ${c.padEnd(10)} ${d[c][L]}`).join('\n');
  };

  const runMatrix = () => {
    os.award('terminal-matrix');
    setBusy(true);
    let n = 0;
    const iv = window.setInterval(() => {
      const row = Array.from({ length: 42 }, () => KATAKANA[Math.floor(Math.random() * KATAKANA.length)]).join(' ');
      push('out', row);
      if (++n >= 12) { window.clearInterval(iv); setBusy(false); }
    }, 380);
  };

  const runHack = () => {
    setBusy(true);
    const steps = lang === 'es'
      ? ['Accediendo a la red principal…', 'Descifrando cortafuegos…', 'Inyectando galletas…', 'Broma completada: aquí no hay nada que hackear.']
      : ['Accessing mainframe…', 'Decrypting firewall…', 'Injecting cookies…', 'Joke complete: nothing to hack here.'];
    let i = 0;
    const iv = window.setInterval(() => {
      const pct = Math.min(100, Math.round(((i + 1) / steps.length) * 100));
      push('out', `[${'█'.repeat(pct / 5)}${'░'.repeat(20 - pct / 5)}] ${pct}% ${steps[i]}`);
      if (++i >= steps.length) { window.clearInterval(iv); setBusy(false); }
    }, 650);
  };

  const exec = (raw: string) => {
    const cmd = raw.trim();
    push('in', cmd);
    if (!cmd) return;
    setHist((h) => [cmd, ...h].slice(0, 50));
    setHistIdx(-1);
    if (!firstCmd.current) { firstCmd.current = true; os.award('terminal-first'); }

    const [c, ...args] = cmd.split(/\s+/);
    const name = c.toLowerCase();
    const L = lang;

    switch (name) {
      case 'help': push('out', helpText()); break;
      case 'about':
        push('out', L === 'es'
          ? 'Jon Peciña — AI Engineer (Logroño, España · UTC+1 · Remoto).\nIngeniero Industrial (UNAV) convertido en AI Engineer.\nAgentes de IA, RAG y LLMs sobre base full-stack: React, Node.js, PostgreSQL.'
          : 'Jon Peciña — AI Engineer (Logroño, Spain · UTC+1 · Remote).\nIndustrial Engineer (UNAV) turned AI Engineer.\nAI agents, RAG and LLMs on a full-stack base: React, Node.js, PostgreSQL.');
        break;
      case 'skills':
        push('out', L === 'es'
          ? 'IA (avanzado): Python · AI Agents · LLMs · RAG · LangChain · Prompt Engineering\nFull-Stack (intermedio): TypeScript · React · Node.js · PostgreSQL\n3D: Three.js · WebGL · Web Audio · Gamepad API'
          : 'AI (advanced): Python · AI Agents · LLMs · RAG · LangChain · Prompt Engineering\nFull-Stack (intermediate): TypeScript · React · Node.js · PostgreSQL\n3D: Three.js · WebGL · Web Audio · Gamepad API');
        break;
      case 'projects':
        push('out', PROJECTS.map((p) => `· ${p.title} — ${p.tagline[L]}`).join('\n') +
          (L === 'es' ? '\n\nEscribe "open" o abre la app Proyectos para el caso de estudio.' : '\n\nOpen the Projects app for the full case study.'));
        break;
      case 'contact':
        push('out', `Email: ${EMAIL}\nLinkedIn: ${LINKEDIN}\nGitHub: ${GITHUB}`);
        break;
      case 'resume': os.openApp('resume'); push('out', L === 'es' ? 'Abriendo el currículum…' : 'Opening the resume…'); break;
      case 'whoami': push('out', L === 'es' ? 'jon — invitado con privilegios de curiosidad' : 'jon — guest with curiosity privileges'); break;
      case 'date': push('out', new Date().toString()); break;
      case 'echo': push('out', args.join(' ')); break;
      case 'clear': setLines([]); break;
      case 'lang': os.setLang(L === 'es' ? 'en' : 'es'); push('out', L === 'es' ? 'Idioma: English' : 'Language: Español'); break;
      case 'theme': {
        const cur = os.settings.theme;
        os.updateSettings({ theme: cur === 'dark' ? 'light' : 'dark' });
        push('out', L === 'es' ? `Tema: ${cur === 'dark' ? 'claro' : 'oscuro'}` : `Theme: ${cur === 'dark' ? 'light' : 'dark'}`);
        break;
      }
      case 'fortune': {
        const f = FORTUNES[L];
        push('out', '🥠 ' + f[Math.floor(Math.random() * f.length)]);
        break;
      }
      case 'matrix': runMatrix(); break;
      case 'hack': runHack(); break;
      case 'sudo':
        push('err', L === 'es'
          ? 'jon no está en el archivo sudoers. Este incidente será reportado a Jon.'
          : 'jon is not in the sudoers file. This incident will be reported to Jon.');
        break;
      case 'exit': os.closeApp('terminal'); break;
      default:
        push('err', (t('terminal.unknown') as (c: string) => string)(name));
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (busy && e.key !== 'Escape') { if (e.key === 'Enter') return; }
    if (e.key === 'Enter') { exec(input); setInput(''); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (hist.length) {
        const n = Math.min(histIdx + 1, hist.length - 1);
        setHistIdx(n); setInput(hist[n]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) { setHistIdx(histIdx - 1); setInput(hist[histIdx - 1]); }
      else { setHistIdx(-1); setInput(''); }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const frag = input.trim().toLowerCase();
      if (!frag.includes(' ')) {
        const hit = COMMANDS.find((c) => c.startsWith(frag));
        if (hit) setInput(hit + ' ');
      }
    }
  };

  const prompt = t('terminal.prompt') as string;

  return (
    <div className="jos-term" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
      {lines.map((l) => l.kind === 'in' ? (
        <div key={l.id}><span className="p"><span className="u">{prompt}</span>:~$</span> <span className="out">{l.text}</span></div>
      ) : (
        <div key={l.id} className={l.kind === 'err' ? 'err' : 'out'}>{l.text}</div>
      ))}
      <div className="jos-term-inputrow">
        <span className="p"><span className="u">{prompt}</span>:~$&nbsp;</span>
        <input
          ref={inputRef}
          className="jos-term-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="terminal input"
        />
      </div>
    </div>
  );
}
