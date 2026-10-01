import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { ACCENTS, AppId, EMAIL, Lang, Settings, Toast, WinState } from './types';
import { STR } from './strings';
import { ACHIEVEMENTS, levelFor, totalXp } from '../data/achievements';

type Phase = 'boot' | 'lock' | 'desktop';

const LS = {
  lang: 'jon-os:lang',
  settings: 'jon-os:settings',
  ach: 'jon-os:ach',
  favs: 'jon-os:favs',
  hint: 'jon-os:hint-seen',
};

const DEFAULT_SETTINGS: Settings = { accent: 'aqua', wallpaper: 'nebula', theme: 'dark', uiSize: 'normal' };

const WIN_SIZE: Record<AppId, [number, number]> = {
  about: [660, 680],
  projects: [880, 660],
  project: [820, 700],
  resume: [720, 660],
  contact: [660, 700],
  terminal: [700, 500],
  achievements: [740, 580],
  settings: [580, 540],
  help: [620, 580],
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } as T : fallback;
  } catch { return fallback; }
}
function readArr(key: string): string[] {
  try { const v = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(v) ? v : []; }
  catch { return []; }
}

interface OS {
  phase: Phase;
  lang: Lang;
  t: (path: string) => any;
  settings: Settings;
  wins: WinState[];
  toasts: Toast[];
  unlocked: Record<string, number>;
  xp: number;
  level: { level: number; cur: number; next: number };
  favs: string[];
  startOpen: boolean;
  recruiterOpen: boolean;
  showHint: boolean;
  boot: () => void;
  unlock: () => void;
  lock: () => void;
  setLang: (l: Lang) => void;
  updateSettings: (p: Partial<Settings>) => void;
  openApp: (app: AppId, payload?: Record<string, unknown>) => void;
  openProject: (slug: string) => void;
  closeWin: (id: number) => void;
  closeApp: (app: AppId) => void;
  focusWin: (id: number) => void;
  toggleMin: (id: number) => void;
  toggleMax: (id: number) => void;
  moveWin: (id: number, x: number, y: number) => void;
  toggleFav: (slug: string) => void;
  award: (id: string) => void;
  toast: (msg: string, xp?: number) => void;
  copyEmail: () => void;
  setStartOpen: (v: boolean) => void;
  setRecruiterOpen: (v: boolean) => void;
  dismissHint: () => void;
  printCV: () => void;
}

const Ctx = createContext<OS | null>(null);
export const useOS = () => useContext(Ctx) as OS;

let winSeq = 1;
let toastSeq = 1;
let zSeq = 10;

function applySettingsToDom(s: Settings) {
  const a = ACCENTS[s.accent];
  const r = document.documentElement;
  r.style.setProperty('--accent', a.hex);
  r.style.setProperty('--accent-rgb', a.rgb);
  r.style.setProperty('--accent-ink', a.ink);
  r.dataset.theme = s.theme;
  r.dataset.uisize = s.uiSize;
}

export function OSProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('boot');
  const [lang, setLangState] = useState<Lang>(() => {
    try { return (localStorage.getItem(LS.lang) as Lang) || 'es'; } catch { return 'es'; }
  });
  const [settings, setSettings] = useState<Settings>(() => read<Settings>(LS.settings, DEFAULT_SETTINGS));
  const [wins, setWins] = useState<WinState[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [unlocked, setUnlocked] = useState<Record<string, number>>(() => read<Record<string, number>>(LS.ach, {}));
  const [favs, setFavs] = useState<string[]>(() => readArr(LS.favs));
  const [startOpen, setStartOpen] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const langRef = useRef(lang);
  langRef.current = lang;

  const t = useCallback((path: string) => {
    return path.split('.').reduce((o: any, k) => (o == null ? o : o[k]), STR[langRef.current]);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    applySettingsToDom(settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toast = useCallback((msg: string, xp?: number) => {
    const id = toastSeq++;
    setToasts((ts) => [...ts.slice(-3), { id, msg, xp }]);
    window.setTimeout(() => {
      setToasts((ts) => ts.filter((x) => x.id !== id));
    }, 3400);
  }, []);

  const award = useCallback((id: string) => {
    setUnlocked((u) => {
      if (u[id]) return u;
      const ach = ACHIEVEMENTS.find((a) => a.id === id);
      const nu = { ...u, [id]: Date.now() };
      try { localStorage.setItem(LS.ach, JSON.stringify(nu)); } catch { /* noop */ }
      if (ach) {
        const L = langRef.current;
        window.setTimeout(() => {
          const label = L === 'es' ? 'Logro desbloqueado' : 'Achievement unlocked';
          toast(`${label}: ${ach.title[L]}`, ach.xp);
        }, 0);
      }
      return nu;
    });
  }, [toast]);

  const setLang = useCallback((l: Lang) => {
    setLangState((prev) => {
      if (prev === l) return prev;
      try { localStorage.setItem(LS.lang, l); } catch { /* noop */ }
      document.documentElement.lang = l;
      window.setTimeout(() => award('lang-switch'), 0);
      return l;
    });
  }, [award]);

  const updateSettings = useCallback((p: Partial<Settings>) => {
    setSettings((s) => {
      const ns = { ...s, ...p };
      try { localStorage.setItem(LS.settings, JSON.stringify(ns)); } catch { /* noop */ }
      applySettingsToDom(ns);
      if (p.accent && p.accent !== s.accent) window.setTimeout(() => award('accent-change'), 0);
      if (p.wallpaper && p.wallpaper !== s.wallpaper) window.setTimeout(() => award('wallpaper-change'), 0);
      return ns;
    });
  }, [award]);

  const boot = useCallback(() => {
    setPhase('lock');
    award('first-boot');
  }, [award]);

  const unlock = useCallback(() => {
    setPhase('desktop');
    award('unlock');
    try {
      if (!localStorage.getItem(LS.hint)) setShowHint(true);
    } catch { setShowHint(true); }
  }, [award]);

  const lock = useCallback(() => {
    setStartOpen(false);
    setRecruiterOpen(false);
    setPhase('lock');
  }, []);

  const focusWin = useCallback((id: number) => {
    setWins((ws) => ws.map((w) => (w.id === id ? { ...w, z: ++zSeq, min: false } : w)));
  }, []);

  const openApp = useCallback((app: AppId, payload?: Record<string, unknown>) => {
    const keyOf = (a: AppId, p?: Record<string, unknown>) =>
      p && (p as any).slug ? `${a}:${(p as any).slug}` : a;
    const key = keyOf(app, payload);
    const existing = wins.find((w) => keyOf(w.app, w.payload) === key);
    if (existing) {
      setWins((ws) => ws.map((w) => (w.id === existing.id ? { ...w, z: ++zSeq, min: false } : w)));
      setStartOpen(false);
      return;
    }
    const vw = window.innerWidth, vh = window.innerHeight;
    const mobile = vw < 640;
    const [dw, dh] = WIN_SIZE[app];
    const w = mobile ? vw : Math.min(dw, vw - 24);
    const h = mobile ? vh - 84 : Math.min(dh, vh - 110);
    const n = wins.length;
    const x = mobile ? 0 : Math.max(8, Math.min(vw - w - 8, 110 + ((n * 38) % 220)));
    const y = mobile ? 8 : Math.max(8, Math.min(vh - h - 80, 46 + ((n * 30) % 170)));
    const win: WinState = { id: winSeq++, app, z: ++zSeq, min: false, max: false, x, y, w, h, payload };
    setWins((ws) => [...ws, win]);
    setStartOpen(false);
    const achMap: Partial<Record<AppId, string>> = {
      about: 'app-about', projects: 'app-projects', resume: 'app-resume',
      contact: 'app-contact', terminal: 'app-terminal', achievements: 'app-achievements',
    };
    const ach = achMap[app];
    if (ach) window.setTimeout(() => award(ach), 350);
  }, [award, wins.length]);

  const openProject = useCallback((slug: string) => {
    openApp('project', { slug });
    window.setTimeout(() => award('project-open'), 400);
  }, [openApp, award]);

  const closeWin = useCallback((id: number) => {
    setWins((ws) => ws.filter((w) => w.id !== id));
  }, []);

  const closeApp = useCallback((app: AppId) => {
    setWins((ws) => {
      const top = [...ws].filter((w) => w.app === app).sort((a, b) => b.z - a.z)[0];
      return top ? ws.filter((w) => w.id !== top.id) : ws;
    });
  }, []);

  const toggleMin = useCallback((id: number) => {
    setWins((ws) => ws.map((w) => (w.id === id ? { ...w, min: !w.min, z: w.min ? ++zSeq : w.z } : w)));
  }, []);

  const toggleMax = useCallback((id: number) => {
    setWins((ws) => ws.map((w) => {
      if (w.id !== id) return w;
      if (!w.max) window.setTimeout(() => award('window-max'), 0);
      return { ...w, max: !w.max };
    }));
  }, [award]);

  const moveWin = useCallback((id: number, x: number, y: number) => {
    setWins((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  const toggleFav = useCallback((slug: string) => {
    setFavs((f) => {
      const has = f.includes(slug);
      const nf = has ? f.filter((x) => x !== slug) : [...f, slug];
      try { localStorage.setItem(LS.favs, JSON.stringify(nf)); } catch { /* noop */ }
      const L = langRef.current;
      if (!has) {
        window.setTimeout(() => {
          award('project-star');
          toast(L === 'es' ? 'Añadido a favoritos' : 'Added to favorites');
        }, 0);
      } else {
        window.setTimeout(() => toast(L === 'es' ? 'Quitado de favoritos' : 'Removed from favorites'), 0);
      }
      return nf;
    });
  }, [award, toast]);

  const copyEmail = useCallback(() => {
    const done = () => {
      award('copy-email');
      toast(langRef.current === 'es' ? 'Email copiado al portapapeles' : 'Email copied to clipboard');
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(done).catch(done);
      } else { done(); }
    } catch { done(); }
  }, [award, toast]);

  const dismissHint = useCallback(() => {
    setShowHint(false);
    try { localStorage.setItem(LS.hint, '1'); } catch { /* noop */ }
  }, []);

  const printCV = useCallback(() => {
    award('cv-print');
    const L = langRef.current;
    const R = STR[L].resume;
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const eduHtml = (R.edu as any[]).map((e) => `
      <div class="item"><h3>${esc(e.title)}</h3><div class="meta">${esc(e.place)}</div></div>`).join('');
    const skillHtml = (R.skillGroups as any[]).map((g) => `
      <h2>${esc(g.name)}</h2><p class="skills">${(g.skills as any[]).map((s) => esc(s[0])).join(' · ')}</p>`).join('');
    const featHtml = ((R as any).featured as any[]).map((f) => `
      <div class="item"><h3>${esc(f.name)}</h3><p>${esc(f.desc)}</p><div class="meta">${esc(f.stack)}</div></div>`).join('');
    const langHtml = (R.langs as any[]).map((l) => `<div class="item"><h3>${esc(l[0])}</h3><div class="meta">${esc(l[1])}</div></div>`).join('');
    const T = (es: string, en: string) => (L === 'es' ? es : en);
    const html = `<!doctype html><html lang="${L}"><head><meta charset="utf-8"><title>Jon Peciña — CV</title>
<style>body{font-family:Georgia,serif;color:#111;max-width:720px;margin:40px auto;padding:0 24px;line-height:1.55}
h1{font-size:2em;margin:0} .role{color:#0d9488;font-weight:bold;margin:4px 0 2px} .contact{color:#555;font-size:.9em;margin-bottom:8px}
.profile{font-size:.95em;margin:10px 0 0}
h2{font-size:1.05em;text-transform:uppercase;letter-spacing:.08em;border-bottom:2px solid #0d9488;padding-bottom:4px;margin-top:28px}
.item{margin:12px 0} .item h3{margin:0;font-size:1em} .meta{color:#555;font-size:.88em} p{margin:6px 0;font-size:.94em} .skills{font-size:.94em}
@media print{body{margin:0}}</style></head><body>
<h1>Jon Peciña</h1><div class="role">AI Engineer</div>
<div class="contact">Logroño, España · UTC+1 · Remoto · jpecina@gmail.com · linkedin.com/in/jpecina · github.com/jpecinagithub</div>
<p class="profile">${esc((R as any).profile)}</p>
<h2>${T('Habilidades', 'Skills')}</h2>${skillHtml}
<h2>${T('Proyectos destacados', 'Featured Projects')}</h2>${featHtml}
<h2>${T('Educación', 'Education')}</h2>${eduHtml}
<h2>${T('Idiomas', 'Languages')}</h2>${langHtml}
<h2>${T('Cómo trabajo', 'How I Work')}</h2><p>${esc((R as any).howIWork)}</p>
<p class="meta" style="margin-top:28px">${esc(R.avail)}</p>
</body></html>`;
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(html);
      w.document.close();
      w.focus();
      window.setTimeout(() => w.print(), 400);
    }
  }, [award]);

  /* Konami code listener (global). */
  useEffect(() => {
    const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === seq[pos]) {
        pos++;
        if (pos === seq.length) {
          pos = 0;
          award('konami');
          toast(langRef.current === 'es' ? '↑↑↓↓←→←→BA — vieja escuela.' : '↑↑↓↓←→←→BA — old school.');
        }
      } else {
        pos = k === seq[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [award, toast]);

  const xp = useMemo(() => totalXp(unlocked), [unlocked]);
  const level = useMemo(() => levelFor(xp), [xp]);

  const value: OS = {
    phase, lang, t, settings, wins, toasts, unlocked, xp, level, favs,
    startOpen, recruiterOpen, showHint,
    boot, unlock, lock, setLang, updateSettings,
    openApp, openProject, closeWin, closeApp, focusWin, toggleMin, toggleMax, moveWin,
    toggleFav, award, toast, copyEmail, setStartOpen, setRecruiterOpen, dismissHint, printCV,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
