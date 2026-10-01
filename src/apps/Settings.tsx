import { useOS } from '../os/store';
import { ACCENTS, AccentId, ThemeId, UiSize, WallpaperId } from '../os/types';

const ACCENT_IDS: AccentId[] = ['aqua', 'cyan', 'blue', 'violet', 'amber'];
const WALL_IDS: WallpaperId[] = ['nebula', 'starfield', 'matrix', 'dark'];

export default function SettingsApp() {
  const { t, settings, updateSettings } = useOS();
  const wallNames = t('settings.wallpapers') as Record<WallpaperId, string>;
  const accentNames = t('settings.accents') as Record<AccentId, string>;
  const sizeNames = t('settings.sizes') as Record<UiSize, string>;
  const themeNames = t('settings.themes') as Record<ThemeId, string>;

  return (
    <div>
      <div className="jos-set-row">
        <div className="t"><b>{t('settings.accent')}</b><small>{t('settings.accentDesc')}</small></div>
        <div className="jos-swatches">
          {ACCENT_IDS.map((id) => (
            <button
              key={id}
              title={accentNames[id]}
              className={`jos-swatch${settings.accent === id ? ' on' : ''}`}
              style={{ background: ACCENTS[id].hex, ['--c' as any]: ACCENTS[id].hex }}
              onClick={() => updateSettings({ accent: id })}
            />
          ))}
        </div>
      </div>

      <div className="jos-set-row">
        <div className="t"><b>{t('settings.wallpaper')}</b><small>{t('settings.wallpaperDesc')}</small></div>
        <div className="jos-seg">
          {WALL_IDS.map((id) => (
            <button key={id} className={settings.wallpaper === id ? 'on' : ''} onClick={() => updateSettings({ wallpaper: id })}>
              {wallNames[id]}
            </button>
          ))}
        </div>
      </div>

      <div className="jos-set-row">
        <div className="t"><b>{t('settings.uiSize')}</b><small>{t('settings.uiSizeDesc')}</small></div>
        <div className="jos-seg">
          {(['normal', 'large'] as UiSize[]).map((id) => (
            <button key={id} className={settings.uiSize === id ? 'on' : ''} onClick={() => updateSettings({ uiSize: id })}>
              {sizeNames[id]}
            </button>
          ))}
        </div>
      </div>

      <div className="jos-set-row" style={{ borderBottom: 0 }}>
        <div className="t"><b>{t('settings.theme')}</b><small>{t('settings.themeDesc')}</small></div>
        <div className="jos-seg">
          {(['dark', 'light'] as ThemeId[]).map((id) => (
            <button key={id} className={settings.theme === id ? 'on' : ''} onClick={() => updateSettings({ theme: id })}>
              {themeNames[id]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
