import React, { useEffect, useRef, useState } from 'react';
import { useOS } from './store';
import { I } from './icons';
import { EMAIL, GITHUB, LINKEDIN, WHATSAPP, AppId } from './types';
import Wallpaper from './Wallpaper';
import AboutApp from '../apps/About';
import ProjectsApp from '../apps/Projects';
import ProjectCase from '../apps/ProjectCase';
import ResumeApp from '../apps/Resume';
import ContactApp from '../apps/Contact';
import TerminalApp from '../apps/Terminal';
import AchievementsApp from '../apps/Achievements';
import SettingsApp from '../apps/Settings';
import HelpApp from '../apps/Help';

/* ============================== BOOT ============================== */
export function Boot() {
  const { t, boot } = useOS();
  const [pct, setPct] = useState(0);
  const msgs: string[] = t('boot.msgs');
  useEffect(() => {
    const iv = window.setInterval(() => {
      setPct((p) => {
        const n = p + 4 + Math.random() * 7;
        if (n >= 100) {
          window.clearInterval(iv);
          window.setTimeout(boot, 350);
          return 100;
        }
        return n;
      });
    }, 110);
    return () => window.clearInterval(iv);
  }, [boot]);
  const msg = msgs[Math.min(msgs.length - 1, Math.floor((pct / 100) * msgs.length))];
  return (
    <div className="jos-boot">
      <div className="jos-boot-logo">{t('boot.title')}</div>
      <div className="jos-boot-bar"><div style={{ width: `${pct}%` }} /></div>
      <div className="jos-boot-msg">{msg}</div>
    </div>
  );
}

/* ============================== CLOCK ============================== */
export function useClock() {
  const { lang } = useOS();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const iv = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(iv);
  }, []);
  const time = new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid',
  }).format(now);
  const date = new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
    weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Madrid',
  }).format(now);
  return { time, date };
}

/* ============================== LOCK ============================== */
export function LockScreen() {
  const { t, unlock, lang, setLang, setRecruiterOpen } = useOS();
  const { time, date } = useClock();
  return (
    <div className="jos-lock">
      <Wallpaper />
      <button
        className="jos-btn small jos-lock-lang"
        title={t('lock.lang') as string}
        onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
      >
        {lang === 'es' ? 'ES ✓' : 'EN ✓'}
      </button>
      <div className="jos-lock-clock">{time}</div>
      <div className="jos-lock-date" style={{ textTransform: 'capitalize' }}>{date}</div>
      <div className="jos-lock-actions">
        <button className="jos-btn primary" onClick={unlock}>
          <I.lock size={17} /> {t('lock.unlock')}
        </button>
        <button className="jos-btn" onClick={() => setRecruiterOpen(true)}>
          <I.briefcase size={17} /> {t('lock.recruiter')}
        </button>
      </div>
      <div className="jos-lock-hint">{t('lock.hint')}</div>
    </div>
  );
}

/* ============================== RECRUITER ============================== */
export function RecruiterOverlay() {
  const { t, phase, unlock, setRecruiterOpen, openApp, printCV, copyEmail, award } = useOS();
  useEffect(() => { award('recruiter'); }, [award]);
  const enter = () => {
    setRecruiterOpen(false);
    if (phase === 'lock') unlock();
  };
  return (
    <div className="jos-recruiter" onClick={() => setRecruiterOpen(false)}>
      <div className="jos-recruiter-card" onClick={(e) => e.stopPropagation()}>
        <div className="jos-avatar" style={{ margin: '0 auto' }}>JP</div>
        <h2>{t('recruiter.hey')}</h2>
        <div className="role">{t('recruiter.role')}</div>
        <p>{t('recruiter.body')}</p>
        <div className="jos-recruiter-btns">
          <button className="jos-btn primary" onClick={() => { setRecruiterOpen(false); openApp('resume'); }}>
            <I.doc size={16} /> {t('recruiter.viewCv')}
          </button>
          <button className="jos-btn" onClick={() => { setRecruiterOpen(false); openApp('projects'); }}>
            <I.globe size={16} /> {t('recruiter.projects')}
          </button>
          <button className="jos-btn" onClick={printCV}>
            <I.printer size={16} /> {t('recruiter.downloadCv')}
          </button>
          <button className="jos-btn" onClick={() => { setRecruiterOpen(false); openApp('contact'); }}>
            <I.mail size={16} /> {t('recruiter.contact')}
          </button>
          <button className="jos-btn" onClick={copyEmail}>
            <I.copy size={16} /> {t('recruiter.copyEmail')}
          </button>
          <button className="jos-btn" onClick={enter}>
            <I.arrowR size={16} /> {t('recruiter.enter')}
          </button>
        </div>
        <div className="jos-elsewhere" style={{ justifyContent: 'center', border: 0, marginTop: 4, paddingTop: 0 }}>
          <a className="jos-soc" href={LINKEDIN} target="_blank" rel="noreferrer" title="LinkedIn"><I.linkedin size={19} /></a>
          <a className="jos-soc" href={GITHUB} target="_blank" rel="noreferrer" title="GitHub"><I.github size={19} /></a>
          <a className="jos-soc" href={WHATSAPP} target="_blank" rel="noreferrer" title="WhatsApp"><I.whatsapp size={19} /></a>
          <span className="jos-email-row">{EMAIL}<button onClick={copyEmail}>{t('about.copyEmail')}</button></span>
        </div>
      </div>
    </div>
  );
}

/* ============================== WINDOWS ============================== */
const APP_ICON: Record<AppId, (p: any) => JSX.Element> = {
  about: I.user, projects: I.globe, project: I.globe, resume: I.doc,
  contact: I.mail, terminal: I.terminal, achievements: I.trophy,
  settings: I.gear, help: I.help,
};

function WinTitle({ app, payload }: { app: AppId; payload?: Record<string, unknown> }) {
  const { t } = useOS();
  const base = t(`apps.${app}`) as string;
  const extra = app === 'project' && payload?.slug ? ` — ${String(payload.slug).replace(/-/g, ' ').toUpperCase()}` : '';
  return <>{base}{extra}</>;
}

function WindowView({ id }: { id: number }) {
  const os = useOS();
  const win = os.wins.find((w) => w.id === id);
  const drag = useRef<{ dx: number; dy: number; sx: number; sy: number } | null>(null);
  if (!win || win.min) return null;

  const onBarDown = (e: React.PointerEvent) => {
    if (win.max || (e.target as HTMLElement).closest('.jos-winbtn')) return;
    os.focusWin(id);
    drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y, sx: win.x, sy: win.y };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onBarMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const nx = Math.max(-win.w + 80, Math.min(window.innerWidth - 80, e.clientX - d.dx));
    const ny = Math.max(0, Math.min(window.innerHeight - 120, e.clientY - d.dy));
    os.moveWin(id, nx, ny);
  };
  const onBarUp = () => { drag.current = null; };

  const style: React.CSSProperties = win.max
    ? { left: 6, top: 6, width: 'calc(100vw - 12px)', height: 'calc(100vh - 82px)', zIndex: win.z }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };

  const Icon = APP_ICON[win.app];
  const nopad = win.app === 'project';

  return (
    <div className={`jos-win${win.max ? ' maximized' : ''}`} style={style} onPointerDown={() => os.focusWin(id)}>
      <div
        className="jos-titlebar"
        onPointerDown={onBarDown} onPointerMove={onBarMove} onPointerUp={onBarUp}
        onDoubleClick={() => { if (window.innerWidth >= 640) os.toggleMax(id); }}
      >
        <span className="jos-titlebar-title"><Icon size={17} /><WinTitle app={win.app} payload={win.payload} /></span>
        <span className="jos-winbtns">
          <button className="jos-winbtn" title="—" onClick={(e) => { e.stopPropagation(); os.toggleMin(id); }}><I.minus /></button>
          <button className="jos-winbtn" title="□" onClick={(e) => { e.stopPropagation(); os.toggleMax(id); }}><I.square /></button>
          <button className="jos-winbtn close" title="×" onClick={(e) => { e.stopPropagation(); os.closeWin(id); }}><I.x /></button>
        </span>
      </div>
      <div className={`jos-winbody${nopad ? ' nopad' : ''}`}>
        {win.app === 'about' && <AboutApp />}
        {win.app === 'projects' && <ProjectsApp />}
        {win.app === 'project' && <ProjectCase slug={String(win.payload?.slug || '')} />}
        {win.app === 'resume' && <ResumeApp />}
        {win.app === 'contact' && <ContactApp />}
        {win.app === 'terminal' && <TerminalApp />}
        {win.app === 'achievements' && <AchievementsApp />}
        {win.app === 'settings' && <SettingsApp />}
        {win.app === 'help' && <HelpApp />}
      </div>
    </div>
  );
}

/* ============================== TASKBAR ============================== */
const TRAY_APPS: AppId[] = ['about', 'projects', 'resume', 'contact', 'terminal'];

function Taskbar() {
  const os = useOS();
  const { t, lang, setLang } = os;
  const { time, date } = useClock();
  const openSorted = [...os.wins].sort((a, b) => b.z - a.z);
  const topId = openSorted.find((w) => !w.min)?.id;

  return (
    <div className="jos-taskbar">
      <button
        className={`jos-tb-btn${os.startOpen ? ' active' : ''}`}
        title="Start"
        onClick={() => os.setStartOpen(!os.startOpen)}
      >
        <I.grid />
      </button>
      <div className="jos-tb-sep" />
      {TRAY_APPS.map((app) => {
        const Icon = APP_ICON[app];
        const w = os.wins.find((x) => x.app === app);
        const active = !!w && !w.min && w.id === topId;
        return (
          <button
            key={app}
            className={`jos-tb-btn${active ? ' active' : ''}`}
            title={t(`apps.${app}`)}
            style={{ opacity: w ? 1 : 0.55 }}
            onClick={() => {
              if (!w) os.openApp(app);
              else if (w.min || w.id !== topId) os.focusWin(w.id);
              else os.toggleMin(w.id);
            }}
          >
            <Icon />
          </button>
        );
      })}
      <div className="jos-tb-sep" />
      <div className="jos-tray">
        <button className="jos-tray-btn" title={t('tray.lang')} onClick={() => setLang(lang === 'es' ? 'en' : 'es')}>
          {lang.toUpperCase()}
        </button>
        <button className="jos-tray-btn" title={t('tray.settings')} onClick={() => os.openApp('settings')}>
          <span className="jos-accent-dot" />
        </button>
        <button className="jos-tray-btn" title={t('tray.settings')} onClick={() => os.openApp('settings')}>
          <I.gear size={17} />
        </button>
        <div className="jos-tray-clock">
          <div className="t">{time}</div>
          <div className="d">{date}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================== START MENU ============================== */
const START_APPS: AppId[] = ['about', 'projects', 'resume', 'contact', 'terminal', 'achievements', 'settings', 'help'];

function StartMenu() {
  const os = useOS();
  const { t } = os;
  const [q, setQ] = useState('');
  const searched = useRef(false);
  const list = START_APPS.filter((a) => {
    const name = String(t(`apps.${a}`)).toLowerCase();
    return name.includes(q.trim().toLowerCase());
  });
  return (
    <div className="jos-start">
      <input
        className="jos-input"
        placeholder={t('start.search')}
        value={q}
        autoFocus
        onChange={(e) => {
          setQ(e.target.value);
          if (e.target.value.trim() && !searched.current) {
            searched.current = true;
            os.award('start-search');
          }
        }}
      />
      <div className="jos-start-grid">
        {list.map((app) => {
          const Icon = APP_ICON[app];
          return (
            <button key={app} className="jos-start-app" onClick={() => os.openApp(app)}>
              <span className="g"><Icon /></span>
              {t(`apps.${app}`)}
            </button>
          );
        })}
        {list.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-faint)', padding: 18 }}>{t('start.noResults')}</div>}
      </div>
      <div className="jos-start-footer">
        <button className="jos-btn small" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { os.setStartOpen(false); os.setRecruiterOpen(true); }}>
          <I.briefcase size={15} /> {t('start.recruiter')}
        </button>
        <button className="jos-btn small" style={{ flex: 1, justifyContent: 'center' }} onClick={os.lock}>
          <I.lock size={15} /> {t('start.lock')}
        </button>
        <button className="jos-btn small" style={{ flex: 1, justifyContent: 'center' }} onClick={() => os.openApp('help')}>
          <I.help size={15} /> {t('start.about')}
        </button>
      </div>
    </div>
  );
}

/* ============================== TOASTS ============================== */
function Toasts() {
  const { toasts } = useOS();
  return (
    <div className="jos-toasts">
      {toasts.map((x) => (
        <div key={x.id} className="jos-toast">
          {x.xp != null && <span className="jos-toast-xp">+{x.xp} XP</span>}
          <span className="jos-toast-msg">{x.msg}</span>
        </div>
      ))}
    </div>
  );
}

/* ============================== DESKTOP ============================== */
const DESKTOP_APPS: AppId[] = ['about', 'projects', 'resume', 'contact', 'terminal', 'achievements'];

export function Desktop() {
  const os = useOS();
  const { t } = os;
  return (
    <div className="jos-desktop" onPointerDown={() => { if (os.startOpen) os.setStartOpen(false); }}>
      <Wallpaper />
      <div className="jos-icons" onPointerDown={(e) => e.stopPropagation()}>
        {DESKTOP_APPS.map((app) => {
          const Icon = APP_ICON[app];
          return (
            <button key={app} className="jos-icon" onClick={() => os.openApp(app)}>
              <span className="jos-icon-glyph"><Icon /></span>
              <span className="jos-icon-label">{t(`apps.${app}`)}</span>
            </button>
          );
        })}
      </div>

      {os.wins.map((w) => <WindowView key={w.id} id={w.id} />)}

      {os.showHint && (
        <div className="jos-hint">
          {t('desktop.hint')}
          <div style={{ marginTop: 8, textAlign: 'right' }}>
            <button className="jos-btn small" onClick={(e) => { e.stopPropagation(); os.dismissHint(); }}>
              {t('desktop.hintClose')}
            </button>
          </div>
        </div>
      )}

      {os.startOpen && <StartMenu />}
      <Taskbar />
      <Toasts />
    </div>
  );
}
