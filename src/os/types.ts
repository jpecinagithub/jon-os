export type Lang = 'es' | 'en';
export type AccentId = 'aqua' | 'cyan' | 'blue' | 'violet' | 'amber';
export type WallpaperId = 'nebula' | 'starfield' | 'matrix' | 'dark';
export type ThemeId = 'dark' | 'light';
export type UiSize = 'normal' | 'large';

export interface Settings {
  accent: AccentId;
  wallpaper: WallpaperId;
  theme: ThemeId;
  uiSize: UiSize;
}

export type AppId =
  | 'about'
  | 'projects'
  | 'project'
  | 'resume'
  | 'contact'
  | 'terminal'
  | 'achievements'
  | 'settings'
  | 'help';

export interface WinState {
  id: number;
  app: AppId;
  z: number;
  min: boolean;
  max: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  payload?: Record<string, unknown>;
  closing?: boolean;
}

export interface Toast {
  id: number;
  msg: string;
  xp?: number;
}

export const ACCENTS: Record<AccentId, { hex: string; rgb: string; ink: string }> = {
  aqua: { hex: '#2dd4bf', rgb: '45, 212, 191', ink: '#04211d' },
  cyan: { hex: '#22d3ee', rgb: '34, 211, 238', ink: '#08272e' },
  blue: { hex: '#60a5fa', rgb: '96, 165, 250', ink: '#0a1c33' },
  violet: { hex: '#a78bfa', rgb: '167, 139, 250', ink: '#1e1440' },
  amber: { hex: '#fbbf24', rgb: '251, 191, 36', ink: '#33230a' },
};

export const EMAIL = 'jpecina@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/jpecina/';
export const GITHUB = 'https://github.com/jpecinagithub';
export const WHATSAPP = 'https://wa.me/34634605035';
