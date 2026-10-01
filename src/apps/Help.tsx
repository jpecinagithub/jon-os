import { useOS } from '../os/store';

export default function HelpApp() {
  const { t } = useOS();
  const rows = t('help.rows') as [string, string][];
  return (
    <div>
      <h2 className="jos-h">{t('help.title')}</h2>
      <p className="jos-sub">{t('help.intro')}</p>
      {rows.map(([k, d], i) => (
        <div key={i} className="jos-help-row">
          <span className="k"><b>{k}</b></span>
          <span className="d">{d}</span>
        </div>
      ))}
      <div className="jos-section-label">{t('help.aboutSite')}</div>
      <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>{t('help.aboutSiteBody')}</p>
    </div>
  );
}
