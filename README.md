# AUI (Architectural UI) — Architectural Precision Design System

<p align="center">
  <strong>An agent-agnostic high-craft UI design system and component library.</strong><br>
  Swiss architectural drafting boards, precision mechanical gauges, hairline bento grids, and high-craft digital brutalism.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/AUI-Design%20System-blue?style=flat-square" alt="AUI Badge" />
  <img src="https://img.shields.io/badge/Agent-Agnostic-success?style=flat-square" alt="Agent Agnostic" />
  <img src="https://img.shields.io/badge/CSS-Houdini%20Interpolation-purple?style=flat-square" alt="CSS Houdini" />
  <img src="https://img.shields.io/badge/Scrollbar-Rolling%20Odometer-orange?style=flat-square" alt="Odometer Scrollbar" />
  <img src="https://img.shields.io/badge/License-MIT-black?style=flat-square" alt="License MIT" />
</p>

---

## ✦ Overview

**AUI** is a formal architectural UI specification designed for precision instruments and high-craft creative tools. It transforms this unique visual signature into:

1. **An Agent-Agnostic Skill (`SKILL.md`)**: A standardized directive that any autonomous AI agent (Claude, Cursor, Windsurf, Gemini, OpenAI Codex, Antigravity) can load to build complete, breathtaking websites in this exact style.
2. **Production Component Libraries**: Drop-in components for **React / Next.js**, **Vue 3**, and **Vanilla HTML/CSS**.
3. **The Iconic Precision Ruler Scrollbar**: A custom engineering vertical rail with 1% gauge ticks, laser cursor needle, and 3-digit mechanical rolling odometer digits (`000%` – `100%`).
4. **CSS Houdini Theme Engine**: Mathematical color interpolation between *Warm Technical Paper* (`#f2f1ee`) and *Tactical Obsidian* (`#121316`) without repainting DOM artifacts.
5. **Interactive Demo**: A complete, live showcase website in `demo/index.html`.

---

## ✦ Key Architectural Pillars

### 1. The Precision Ruler Scrollbar
Replaces the browser's generic scrollbar with a CAD-grade vertical engineering gauge:
- **Major & Minor Ticks**: Hairline markings across the height of the document.
- **Laser Alignment Needle**: 1px horizontal cursor with subtle ambient glow (`box-shadow: 0 0 6px var(--accent)`).
- **Mechanical Rolling Digits (Odometer)**: 3-column rolling digits (`0`-`9`) translating smoothly with `cubic-bezier(0.2, 0.9, 0.2, 1)` easing.
- **Section Markers**: Dynamic section numbers (`01`, `02`, `03`) placed on the rail that scroll directly to section anchors.

### 2. Hairline Bento Grid System
Standard CSS borders often double up or cause 1px sub-pixel jitter. AUI uses the **Gap-Hairline Pattern**:
- Container: `background-color: var(--line); display: grid; gap: 1px; border: 1px solid var(--line);`
- Children (Cells): `background-color: var(--bg);`
- Result: Razor-sharp, authentic 1px engineering drafting grid lines.

### 3. Corner Registration Marks (`.tick`)
Pins 11px hairline drafting crosshairs to the corners of bounded containers and cards, evoking physical technical schematics and blueprints.

### 4. Typographic Hierarchy & The "Editorial Contrast"
- **Display Headings**: `Archivo` (620 weight, 118% stretch, `-0.035em` tracking, tight leading).
- **Editorial Contrast**: `Instrument Serif` (Italics) for single-word humanistic flourishes inside brutalist headings.
- **HUD Telemetry**: `Geist Mono` (11px, `0.15em` letter-spacing, uppercase) for coordinates, status tags, and metadata.
- **Body Copy**: `Inter` (clean, relaxed line height, muted ink).

### 5. Snappy Thermal Inversion (`.invert-block`)
No mushy button shadows. Interactive elements invert instantly (`120ms linear`) between foreground and background colors on hover or active states.

---

## ✦ Repository Structure

```
aui/
├── SKILL.md                          # The Agent-Agnostic Skill specification
├── prompt-guide.md                   # AI Agent prompt directives & templates
├── aui.css                           # Standalone CSS tokens, Houdini @property, & components
├── aui.js                            # Standalone client controller (Ruler, Theme, Ticks, Sound)
├── tailwind.config.js                # Tailwind CSS v3 / v4 theme extension
├── package.json                      # Package metadata
├── components/
│   ├── react/                        # React / Next.js (TypeScript) components
│   │   ├── AUIRulerScrollbar.tsx     # Ruler scrollbar with mechanical odometer
│   │   ├── AUIHUDCornerTick.tsx      # Corner drafting crosshair ticks
│   │   ├── AUIHUDEyebrow.tsx         # Sticky section header eyebrow
│   │   ├── AUIHairlineGrid.tsx       # 1px hairline bento grid
│   │   ├── AUIInvertBlock.tsx        # High-contrast inversion button/card
│   │   ├── AUIHero.tsx               # Architectural display hero
│   │   ├── AUITickerMarquee.tsx      # Infinite horizontal ribbon ticker
│   │   ├── AUIPlanCard.tsx           # Ambient glow pricing card
│   │   ├── AUIToolBadge.tsx          # Software/craft showcase card
│   │   ├── AUIThemeToggle.tsx        # Smooth Houdini theme switcher
│   │   └── index.ts
│   ├── vue/                          # Vue 3 / Nuxt 3 components
│   │   ├── AUIRulerScrollbar.vue
│   │   ├── AUIHUDCornerTick.vue
│   │   ├── AUIInvertBlock.vue
│   │   └── AUIThemeToggle.vue
│   └── html/                         # HTML snippets & blueprints
│       ├── ruler.html
│       ├── bento-grid.html
│       ├── hud-cards.html
│       ├── hero.html
│       └── marquee.html
└── demo/                             # Live standalone demo website
    ├── index.html                    # Complete showcase landing page
    ├── demo.css                      # Demo utility classes
    └── demo.js                       # Demo interaction handlers
```

---

## ✦ Quick Start

### Option 1: Vanilla HTML / CSS / JS

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <link rel="stylesheet" href="aui.css" />
</head>
<body class="scanline-bg">
  <main class="mx-auto max-w-[1280px] border-x border-line">
    <div class="relative p-12">
      <!-- Corner drafting ticks -->
      <span aria-hidden="true" class="tick tick-half tick-tl"></span>
      <span aria-hidden="true" class="tick tick-half tick-tr"></span>

      <p class="hud-label text-accent-ink">01 // TELEMETRY</p>
      <h1 class="font-display text-6xl text-ink-strong">
        Precision <span class="font-serif-italic text-accent-ink">Craft</span>
      </h1>
      <button class="invert-block mt-6 border border-line px-6 py-3 font-mono text-xs uppercase">
        Launch System
      </button>
    </div>
  </main>

  <script src="aui.js"></script>
</body>
</html>
```

### Option 2: React / Next.js

```tsx
import { 
  AUIRulerScrollbar, 
  AUIHUDCornerTick, 
  AUIHUDEyebrow, 
  AUIHairlineGrid, 
  AUIHairlineCell, 
  AUIInvertBlock 
} from './components/react';

export default function Page() {
  return (
    <>
      {/* Precision Ruler Scrollbar */}
      <AUIRulerScrollbar />

      <main className="mx-auto max-w-[1280px] border-x border-line relative">
        <AUIHUDCornerTick position="all" half />

        <AUIHUDEyebrow index={1} title="Architecture" subtitle="CAD Precision" />

        <AUIHairlineGrid columns={3}>
          <AUIHairlineCell>
            <p className="hud-label text-accent-ink">01 // GRID</p>
            <h3 className="font-display text-2xl mt-4">Sub-pixel raster</h3>
          </AUIHairlineCell>
          {/* more cells */}
        </AUIHairlineGrid>
      </main>
    </>
  );
}
```

### Option 3: Use as an Agent Skill

Copy `SKILL.md` to your agent skills folder:
- **Antigravity**: `~/.gemini/config/skills/aui/SKILL.md`
- **Cursor / Windsurf**: `.cursorrules` or `.windsurfrules`
- **Claude Code**: Prompt with contents of `prompt-guide.md`

Tell your agent:
> *"Build this landing page using the AUI design skill."*

---

## ✦ Color Tokens Reference

| Variable | Light Theme (*Paper*) | Dark Theme (*Obsidian*) | Usage |
| :--- | :--- | :--- | :--- |
| `--bg` | `#f2f1ee` | `#121316` | Main canvas |
| `--bg-raised` | `#faf9f7` | `#101014` | Cards & elevated panels |
| `--bg-sunken` | `#e9e8e4` | `#060607` | Code blocks & cutouts |
| `--ink` | `#101014` | `#f2f1ee` | Body text |
| `--ink-strong`| `#000000` | `#ffffff` | Headings & emphasis |
| `--muted` | `#1010149e` | `#f2f1ee99` | Secondary copy |
| `--line` | `#10101429` | `#f2f1ee26` | 1px hairline dividers |
| `--accent` | `#2d81ff` | `#2d81ff` | Electric cobalt |
| `--accent-ink`| `#1659c4` | `#74aaff` | High-contrast accent ink |

---

## ✦ License

MIT &copy; [Aayush Shah](https://github.com/shahaayush265). Built with precision engineering.
