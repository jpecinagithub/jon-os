import type { Lang } from '../os/types';

export interface Achievement {
  id: string;
  xp: number;
  icon: string;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-boot', xp: 10, icon: 'zap', title: { es: 'Primer arranque', en: 'First boot' }, desc: { es: 'Jon OS arrancó por primera vez en este navegador.', en: 'Jon OS booted for the first time in this browser.' } },
  { id: 'unlock', xp: 10, icon: 'lock', title: { es: 'Sesión iniciada', en: 'Unlocked' }, desc: { es: 'Desbloqueaste el escritorio.', en: 'You unlocked the desktop.' } },
  { id: 'app-about', xp: 5, icon: 'user', title: { es: 'Cotilla', en: 'Nosy' }, desc: { es: 'Abriste "Sobre mí".', en: 'You opened "About Me".' } },
  { id: 'app-projects', xp: 5, icon: 'globe', title: { es: 'Vitrina', en: 'Showcase' }, desc: { es: 'Abriste "Proyectos".', en: 'You opened "Projects".' } },
  { id: 'app-resume', xp: 5, icon: 'doc', title: { es: 'En papel', en: 'On paper' }, desc: { es: 'Abriste el "Currículum".', en: 'You opened the "Resume".' } },
  { id: 'app-contact', xp: 5, icon: 'mail', title: { es: 'Hola, mundo', en: 'Hello, world' }, desc: { es: 'Abriste "Contacto".', en: 'You opened "Contact".' } },
  { id: 'app-terminal', xp: 5, icon: 'terminal', title: { es: 'Consola', en: 'Console' }, desc: { es: 'Abriste la Terminal.', en: 'You opened the Terminal.' } },
  { id: 'app-achievements', xp: 5, icon: 'trophy', title: { es: 'Coleccionista', en: 'Collector' }, desc: { es: 'Abriste los "Logros".', en: 'You opened "Achievements".' } },
  { id: 'project-open', xp: 10, icon: 'search', title: { es: 'Caso de estudio', en: 'Case study' }, desc: { es: 'Abriste el caso de estudio de un proyecto.', en: 'You opened a project case study.' } },
  { id: 'project-star', xp: 5, icon: 'star', title: { es: 'Favorito', en: 'Favorite' }, desc: { es: 'Marcaste un proyecto como favorito.', en: 'You starred a project.' } },
  { id: 'lang-switch', xp: 5, icon: 'chat', title: { es: 'Bilingüe', en: 'Bilingual' }, desc: { es: 'Cambiaste el idioma del sistema.', en: 'You switched the system language.' } },
  { id: 'accent-change', xp: 5, icon: 'zap', title: { es: 'Decorador', en: 'Decorator' }, desc: { es: 'Cambiaste el color de acento.', en: 'You changed the accent color.' } },
  { id: 'wallpaper-change', xp: 5, icon: 'image', title: { es: 'Paisajista', en: 'Landscaper' }, desc: { es: 'Cambiaste el fondo de escritorio.', en: 'You changed the wallpaper.' } },
  { id: 'terminal-first', xp: 5, icon: 'terminal', title: { es: 'Primera línea', en: 'First line' }, desc: { es: 'Ejecutaste tu primer comando.', en: 'You ran your first command.' } },
  { id: 'terminal-matrix', xp: 15, icon: 'cpu', title: { es: 'Sigue al conejo blanco', en: 'Follow the white rabbit' }, desc: { es: 'Ejecutaste «matrix» en la terminal.', en: 'You ran "matrix" in the terminal.' } },
  { id: 'konami', xp: 25, icon: 'gamepad', title: { es: 'Vieja escuela', en: 'Old school' }, desc: { es: 'Introdujiste el código Konami.', en: 'You entered the Konami code.' } },
  { id: 'recruiter', xp: 10, icon: 'briefcase', title: { es: 'Headhunter', en: 'Headhunter' }, desc: { es: 'Abriste el modo reclutador.', en: 'You opened recruiter mode.' } },
  { id: 'copy-email', xp: 5, icon: 'copy', title: { es: 'Al portapapeles', en: 'To the clipboard' }, desc: { es: 'Copiaste el email de contacto.', en: 'You copied the contact email.' } },
  { id: 'cv-print', xp: 10, icon: 'printer', title: { es: 'En PDF', en: 'To PDF' }, desc: { es: 'Abriste la versión imprimible del CV.', en: 'You opened the printable CV.' } },
  { id: 'window-max', xp: 5, icon: 'square', title: { es: 'Pantalla grande', en: 'Big screen' }, desc: { es: 'Maximizaste una ventana.', en: 'You maximized a window.' } },
  { id: 'start-search', xp: 5, icon: 'search', title: { es: 'Detective', en: 'Detective' }, desc: { es: 'Usaste el buscador del menú de inicio.', en: 'You used the start menu search.' } },
];

/* XP thresholds per level index (0-based). */
const THRESHOLDS = [0, 60, 140, 260, 420];

export function levelFor(totalXp: number): { level: number; cur: number; next: number } {
  let level = 0;
  for (let i = 0; i < THRESHOLDS.length; i++) {
    if (totalXp >= THRESHOLDS[i]) level = i;
  }
  const cur = THRESHOLDS[level];
  const next = THRESHOLDS[level + 1] ?? cur + 200;
  return { level, cur, next };
}

export function totalXp(unlocked: Record<string, number>): number {
  return ACHIEVEMENTS.reduce((s, a) => s + (unlocked[a.id] ? a.xp : 0), 0);
}
