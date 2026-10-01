import { useMemo, useState } from 'react';
import { useOS } from '../os/store';
import { I } from '../os/icons';
import { PROJECTS } from '../data/projects';

export default function ProjectsApp() {
  const { t, lang, openProject, favs, toggleFav } = useOS();
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return PROJECTS;
    return PROJECTS.filter((p) =>
      p.title.toLowerCase().includes(needle) ||
      p.tagline[lang].toLowerCase().includes(needle) ||
      p.stack.some((s) => s.toLowerCase().includes(needle))
    );
  }, [q, lang]);

  const featured = filtered.filter((p) => p.featured);
  const more = filtered.filter((p) => !p.featured);
  const shipped = PROJECTS.filter((p) => p.status === 'shipped').length;

  const card = (slug: string) => {
    const p = PROJECTS.find((x) => x.slug === slug)!;
    const starred = favs.includes(slug);
    return (
      <button key={slug} className="jos-proj-card" onClick={() => openProject(slug)}>
        <span className="jos-proj-shot">
          <img src={p.shots[0]} alt={p.title} loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <span
            className={`jos-proj-star${starred ? ' on' : ''}`}
            role="button" aria-label="star" tabIndex={0}
            onClick={(e) => { e.stopPropagation(); toggleFav(slug); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); toggleFav(slug); } }}
          >
            <I.star size={16} />
          </span>
        </span>
        <span className="jos-proj-info">
          <h4><I.star size={14} style={{ visibility: starred ? 'visible' : 'hidden' }} />{p.title}</h4>
          <p>{p.tagline[lang]}</p>
        </span>
      </button>
    );
  };

  return (
    <div>
      <h2 className="jos-h" style={{ textAlign: 'center' }}>{t('projects.title')}</h2>
      <p className="jos-sub" style={{ textAlign: 'center' }}>{(t('projects.count') as Function)(PROJECTS.length, shipped)}</p>
      <div className="jos-proj-search">
        <input
          className="jos-input"
          placeholder={t('projects.search')}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      {featured.length > 0 && (
        <>
          <div className="jos-section-label">{t('projects.featured')}</div>
          <div className="jos-proj-grid">{featured.map((p) => card(p.slug))}</div>
        </>
      )}
      {more.length > 0 && (
        <>
          <div className="jos-section-label">{t('projects.more')}</div>
          <div className="jos-proj-grid">{more.map((p) => card(p.slug))}</div>
        </>
      )}
      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: 30 }}>{t('projects.noResults')}</p>
      )}
    </div>
  );
}
