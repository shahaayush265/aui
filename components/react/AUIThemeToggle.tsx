import React, { useEffect, useState } from 'react';

export interface AUIThemeToggleProps {
  className?: string;
}

export const AUIThemeToggle: React.FC<AUIThemeToggleProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
    setTheme(current);

    const onThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: 'light' | 'dark' }>;
      setTheme(customEvent.detail.theme);
    };

    window.addEventListener('aui:theme-change', onThemeChange);
    return () => window.removeEventListener('aui:theme-change', onThemeChange);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const html = document.documentElement;

    html.classList.add('theme-anim');
    html.setAttribute('data-theme', next);
    localStorage.setItem('aui-theme-pref', next);
    setTheme(next);

    window.setTimeout(() => {
      html.classList.remove('theme-anim');
    }, 450);

    window.dispatchEvent(new CustomEvent('aui:theme-change', { detail: { theme: next } }));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle visual theme"
      className={`invert-block inline-flex items-center gap-2 border border-line bg-bg px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-invert-bg hover:text-invert-fg ${className}`}
    >
      <span className="h-2 w-2 rounded-full border border-current bg-accent-ink" />
      <span>{theme === 'dark' ? 'OBSIDIAN' : 'PAPER'}</span>
    </button>
  );
};
