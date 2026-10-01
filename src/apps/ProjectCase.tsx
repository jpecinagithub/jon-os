import { useState } from 'react';
import { useOS } from '../os/store';
import { I } from '../os/icons';
import { PROJECTS } from '../data/projects';

export default function ProjectCase({ slug }: { slug: string }) {
  const { t, lang, openProject } = useOS();
  const [idx, setIdx] = useState(0);
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return <p>?</p>;

  const i = PROJECTS.indexOf(p);
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const shots = p.shots.filter(Boolean);
  const statusKey = p.status === 'shipped' ? 'statusShipped' : p.status === 'code' ? 'statusCode' : 'statusDev';

  return (
    <div className="jos-browser">
      <div className="jos-chrome-tabs">
        <span className="jos-chrome-tab"><I.globe size={14} />{p.title}</span>
        <span style={{ color: 'var(--text-faint)', fontSize: '1.2em', padding: '0 4px' }}>+</span>
      </div>
      <div style={{ padding: '8px 0 0' }}>
        <div className="jos-chrome-urlbar">
          <I.lock size={14} />
          <span>{p.url || p.repo || 'jon-os.local'}</span>
        </div>
      </div>

      <div className="jos-case-body">
        {shots.length > 0 && (
          <div className="jos-carousel">
            <img
              key={shots[idx]}
              src={shots[idx]}
              alt={`${p.title} — ${idx + 1}`}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            {shots.length > 1 && (
              <>
                <button className="jos-carousel-btn prev" onClick={() => setIdx((idx - 1 + shots.length) % shots.length)} aria-label={t('projects.prev')}>‹</button>
                <button className="jos-carousel-btn next" onClick={() => setIdx((idx + 1) % shots.length)} aria-label={t('projects.next')}>›</button>
                <div className="jos-carousel-dots">
                  {shots.map((_, d) => <i key={d} className={d === idx ? 'on' : ''} />)}
                </div>
              </>
            )}
          </div>
        )}

        <h2 className="jos-h">{p.title}</h2>
        <p className="jos-sub">{p.tagline[lang]}</p>

        <div className="jos-case-meta">
          <span className={`jos-status ${p.status}`}>{t(`projects.${statusKey}`)}</span>
          <span><b>{t('projects.role')}:</b> {p.role[lang]}</span>
          <span><b>{t('projects.date')}:</b> {p.date[lang]}</span>
        </div>

        <div className="jos-case-actions">
          {p.url && (
            <a className="jos-btn primary" href={p.url} target="_blank" rel="noreferrer">
              <I.external size={15} /> {t('projects.openSite')}
            </a>
          )}
          {p.repo && (
            <a className="jos-btn" href={p.repo} target="_blank" rel="noreferrer">
              <I.github size={16} /> {t('projects.viewCode')}
            </a>
          )}
        </div>

        <div className="jos-case-sec">{t('projects.problem')}</div>
        <p style={{ color: 'var(--text-dim)', lineHeight: 1.65, margin: '0 0 4px' }}>{p.problem[lang]}</p>

        <div className="jos-case-sec">{t('projects.did')}</div>
        <ul className="jos-case-list">
          {p.did[lang].map((d, k) => <li key={k}>{d}</li>)}
        </ul>

        <div className="jos-case-sec">{t('projects.stack')}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {p.stack.map((s) => <span key={s} className="jos-chip plain">{s}</span>)}
        </div>

        <div className="jos-case-sec">{t('projects.outcome')}</div>
        <div className="jos-case-outcome">{p.outcome[lang]}</div>

        <div className="jos-next-proj">
          <button className="jos-btn" onClick={() => { setIdx(0); openProject(next.slug); }}>
            {t('projects.next')}: {next.title} <I.arrowR size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
