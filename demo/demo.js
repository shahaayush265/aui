// Demo Interactions
document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeToggleBtn');
  const themeLabel = document.getElementById('themeToggleLabel');

  const updateLabel = (theme) => {
    if (themeLabel) {
      themeLabel.textContent = theme === 'dark' ? 'OBSIDIAN' : 'PAPER';
    }
  };

  if (themeBtn && window.AUI) {
    const currentTheme = window.AUI.Theme.getTheme();
    updateLabel(currentTheme);

    themeBtn.addEventListener('click', () => {
      const next = window.AUI.Theme.toggle();
      updateLabel(next);
      window.AUI.Sound.click(900);
    });

    window.addEventListener('aui:theme-change', (e) => {
      updateLabel(e.detail.theme);
    });
  }

  // Copy buttons
  const copyCliBtn = document.getElementById('copyCliBtn');
  if (copyCliBtn) {
    copyCliBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('npx aui-skill add all');
      copyCliBtn.textContent = 'COPIED!';
      window.AUI.Sound.click(1200);
      setTimeout(() => { copyCliBtn.textContent = 'COPY'; }, 2000);
    });
  }

  const copyPromptBtn = document.getElementById('copyPromptBtn');
  if (copyPromptBtn) {
    copyPromptBtn.addEventListener('click', () => {
      const directive = `Follow the AUI Design Language Specification:
- Use warm technical paper (#f2f1ee) in light mode, tactical obsidian (#121316) in dark mode.
- Use Archivo (display 620 weight, -0.035em tracking) paired with Instrument Serif italics for emphasis.
- Hairline grids with 1px border dividers (gap-px with bg-line).
- Precision corner drafting crosshair ticks (.tick) at container intersections.
- Tactical monospaced HUD micro-labels (Geist Mono, uppercase, 0.15em letter-spacing).
- Snappy 120ms contrast inversion on hover (.invert-block).
- Precision ruler scrollbar with 3-digit rolling mechanical odometer readout.`;
      navigator.clipboard.writeText(directive);
      copyPromptBtn.textContent = 'COPIED TO CLIPBOARD!';
      window.AUI.Sound.click(1200);
      setTimeout(() => { copyPromptBtn.textContent = 'COPY AGENT DIRECTIVE'; }, 2000);
    });
  }
});
