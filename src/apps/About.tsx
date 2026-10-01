import { useOS } from '../os/store';
import { I } from '../os/icons';
import { EMAIL, GITHUB, LINKEDIN } from '../os/types';

const SPEC_ICONS = [I.cpu, I.layers, I.gamepad];

export default function AboutApp() {
  const { t, openApp, copyEmail } = useOS();
  const specs = t('about.specs') as { title: string; desc: string; chips: string[] }[];
  return (
    <div>
      <div className="jos-about-hero">
        <div className="jos-avatar">JP</div>
        <div>
          <h2 className="jos-about-name">
            Jon Peciña
            <span className="jos-badge"><span className="dot" />{t('about.available')}</span>
          </h2>
          <div className="jos-about-role">{t('about.role')}</div>
          <p className="jos-about-loc">{t('about.location')}</p>
        </div>
      </div>

      <p className="jos-about-bio">{t('about.bio')}</p>

      <div className="jos-spec-grid">
        {specs.map((s, i) => {
          const Icon = SPEC_ICONS[i] || I.cpu;
          return (
            <div key={i} className="jos-card jos-spec">
              <h4><Icon />{s.title}</h4>
              <p>{s.desc}</p>
              <div className="chips">{s.chips.map((c) => <span key={c} className="jos-chip plain">{c}</span>)}</div>
            </div>
          );
        })}
      </div>

      <div className="jos-about-cta">
        <button className="jos-btn primary" onClick={() => openApp('projects')}>
          {t('about.viewProjects')} <I.arrowR size={16} />
        </button>
        <button className="jos-btn" onClick={() => openApp('resume')}>{t('about.resume')}</button>
        <button className="jos-btn" onClick={() => openApp('contact')}>{t('about.contact')}</button>
      </div>

      <div className="jos-elsewhere">
        <span className="lbl">{t('about.elsewhere')}</span>
        <a className="jos-soc" href={LINKEDIN} target="_blank" rel="noreferrer" title="LinkedIn"><I.linkedin /></a>
        <a className="jos-soc" href={GITHUB} target="_blank" rel="noreferrer" title="GitHub"><I.github /></a>
        <a className="jos-soc" href={`mailto:${EMAIL}`} title="Email"><I.mail /></a>
        <span className="jos-email-row">{EMAIL}<button onClick={copyEmail}>{t('about.copyEmail')}</button></span>
      </div>
    </div>
  );
}
