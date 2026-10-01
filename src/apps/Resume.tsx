import { useState } from 'react';
import { useOS } from '../os/store';
import { I } from '../os/icons';

type Tab = 'exp' | 'skills' | 'feat' | 'edu' | 'lang';

export default function ResumeApp() {
  const { t } = useOS();
  const [tab, setTab] = useState<Tab>('exp');
  const { printCV, openProject } = useOS();
  const tabs = t('resume.tabs') as Record<Tab, string>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 6 }}>
        <h2 className="jos-h" style={{ margin: 0 }}>Jon Peciña <span style={{ color: 'var(--accent)', fontSize: '0.6em' }}>· AI Engineer</span></h2>
        <button className="jos-btn primary small" onClick={printCV} title={t('resume.printHint')}>
          <I.printer size={15} /> {t('resume.download')}
        </button>
      </div>

      <div className="jos-tabs">
        {(Object.keys(tabs) as Tab[]).map((k) => (
          <button key={k} className={`jos-tab${tab === k ? ' on' : ''}`} onClick={() => setTab(k)}>
            {tabs[k]}
          </button>
        ))}
      </div>

      {tab === 'exp' && (
        <div className="jos-timeline">
          {(t('resume.exp') as any[]).map((e, i) => (
            <div key={i} className="jos-tl-item">
              <h4>{e.title}</h4>
              <div className="where">{e.where}</div>
              <div className="when">{e.when}</div>
              <p>{e.desc}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'skills' && (
        <div>
          {(t('resume.skillGroups') as any[]).map((g, i) => (
            <div key={i} className="jos-skillgroup">
              <h4>{g.name}</h4>
              {(g.skills as [string, number, string][]).map(([name, pct, lv]) => (
                <div key={name} className="jos-skill">
                  <span className="nm">{name}</span>
                  <span className="bar"><div style={{ width: `${pct}%` }} /></span>
                  <span className="lv">{lv}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === 'feat' && (
        <div>
          {(t('resume.featured') as any[]).map((f, i) => (
            <button key={i} className="jos-card jos-feat" onClick={() => openProject(f.slug)} title={f.name}>
              <h4>{f.name}</h4>
              <p>{f.desc}</p>
              <div className="stack">{f.stack}</div>
            </button>
          ))}
        </div>
      )}

      {tab === 'edu' && (
        <div>
          {(t('resume.edu') as any[]).map((e, i) => (
            <div key={i} className="jos-edu">
              <span className="ic"><I.doc size={22} /></span>
              <div><h4>{e.title}</h4><p>{e.place}</p></div>
            </div>
          ))}
        </div>
      )}

      {tab === 'lang' && (
        <div>
          {(t('resume.langs') as [string, string][]).map(([name, lv]) => (
            <div key={name} className="jos-lang-row">
              <b>{name}</b>
              <span className="jos-chip">{lv}</span>
            </div>
          ))}
        </div>
      )}

      <div className="jos-avail">{t('resume.avail')}</div>
    </div>
  );
}
