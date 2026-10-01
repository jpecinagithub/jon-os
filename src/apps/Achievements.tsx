import { useOS } from '../os/store';
import { I } from '../os/icons';
import { ACHIEVEMENTS } from '../data/achievements';

export default function AchievementsApp() {
  const { t, lang, unlocked, xp, level } = useOS();
  const names = t('achievements.levels') as string[];
  const pct = Math.min(100, Math.round(((xp - level.cur) / Math.max(1, level.next - level.cur)) * 100));
  const done = ACHIEVEMENTS.filter((a) => unlocked[a.id]).length;

  return (
    <div>
      <div className="jos-level">
        <div className="jos-level-num">{level.level + 1}</div>
        <div className="jos-level-info">
          <h3>{t('achievements.level')} {level.level + 1} — {names[level.level]}</h3>
          <div className="jos-xpbar"><div style={{ width: `${pct}%` }} /></div>
          <div className="jos-xpbar-lbl">
            {(t('achievements.xpBar') as (x: number, y: number) => string)(xp, level.next)}
            {' · '}{(t('achievements.unlocked') as (n: number, tt: number) => string)(done, ACHIEVEMENTS.length)}
          </div>
        </div>
      </div>

      <div className="jos-ach-grid">
        {ACHIEVEMENTS.map((a) => {
          const un = !!unlocked[a.id];
          const Icon = (I as any)[a.icon] || I.trophy;
          return (
            <div key={a.id} className={`jos-ach${un ? '' : ' locked'}`}>
              <span className="medal"><Icon /></span>
              <span style={{ flex: 1 }}>
                <b>{un ? a.title[lang] : t('achievements.locked')}</b>
                <small>{un ? a.desc[lang] : '···'}</small>
              </span>
              <span className="xp">+{a.xp}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
