---
name: aui
description: Design and build websites in the AUI (Architectural UI) design language — an architectural precision, engineering drafting board aesthetic featuring mechanical rolling odometer scrollbars, corner registration ticks, hairline bento grids, CSS Houdini smooth theme transitions, and brutalist-editorial typography.
---

# AUI — Architectural Precision & High-Craft UI Design System

AUI is an agent-agnostic design system and front-end specification inspired by high-craft precision creative suites. It marries Swiss architectural drafting boards, precision mechanical gauges, and high-craft digital brutalism.

Any AI agent (Claude, Cursor, Windsurf, Gemini, OpenAI Codex, Antigravity) reading this specification can immediately generate, restyle, or scaffold complete production websites in this exact visual signature.

---

## 1. Visual Identity & Philosophy

AUI is characterized by:
- **The Drafting Board**: Planar surfaces, bounded architectural canvases, hairline 1px dividers, and corner registration crosshairs referencing physical engineering blueprints.
- **The Mechanical Gauge**: Replacing generic UI abstractions with precision instrumentation — specifically a vertical ruler scrollbar with rolling 3-digit mechanical odometer readouts (`000%` – `100%`) and laser alignment needles.
- **Editorial Contrast**: Super-dense, mechanical brutalist sans-serif headings (`Archivo`, 620 weight, -0.035em tracking) paired with humanistic italic serif accents (`Instrument Serif`) or electric cobalt spans.
- **Instant Thermal Inversion**: Rather than soft shadow fades or blurry transitions, interactive elements snap into contrast via ultra-crisp 120ms color inversion (`.invert-block`).
- **Mathematical Color Morphing**: Themes don't snap or flicker. CSS Houdini `@property` custom properties interpolate color values smoothly over 400ms.

---

## 2. Color Tokens & Theme Architecture

AUI enforces two deliberate palettes. Never use generic middle-gray or default Tailwind gray.

### Light Theme: *Warm Technical Paper*
- Surface Canvas (`--bg`): `#f2f1ee` (Warm architectural bond paper)
- Surface Raised (`--bg-raised`): `#faf9f7` (Card / modal elevated paper)
- Surface Sunken (`--bg-sunken`): `#e9e8e4` (Cutout / well / code block)
- Ink Body (`--ink`): `#101014`
- Ink Strong (`--ink-strong`): `#000000`
- Ink Muted (`--muted`): `#1010149e` (~62% opacity)
- Ink Faint (`--faint`): `#1010146b` (~42% opacity)
- Hairline Dividers (`--line`): `#10101429` (16% opacity boundary)
- Hairline Strong (`--line-strong`): `#10101466` (40% opacity crosshair/rule)
- Electric Accent (`--accent`): `#2d81ff` (Electric cobalt)
- Accent Text Ink (`--accent-ink`): `#1659c4` (High-contrast accessible text)
- Invert Surfaces (`--invert-bg` / `--invert-fg`): `#101014` / `#f2f1ee`
- Alert Danger (`--danger`): `#b3261e`
- Subtle Scanline (`--scanline`): `#10101408`

### Dark Theme: *Tactical Obsidian*
- Surface Canvas (`--bg`): `#121316` (Deep tactical darkroom)
- Surface Raised (`--bg-raised`): `#101014`
- Surface Sunken (`--bg-sunken`): `#060607`
- Ink Body (`--ink`): `#f2f1ee`
- Ink Strong (`--ink-strong`): `#ffffff`
- Ink Muted (`--muted`): `#f2f1ee99` (~60% opacity)
- Ink Faint (`--faint`): `#f2f1ee61` (~38% opacity)
- Hairline Dividers (`--line`): `#f2f1ee26` (15% opacity boundary)
- Hairline Strong (`--line-strong`): `#f2f1ee66` (40% opacity crosshair/rule)
- Electric Accent (`--accent`): `#2d81ff`
- Accent Text Ink (`--accent-ink`): `#74aaff` (Luminous cobalt)
- Invert Surfaces (`--invert-bg` / `--invert-fg`): `#ffffff` / `#0b0b0c`
- Alert Danger (`--danger`): `#ff6259`
- Subtle Scanline (`--scanline`): `#ffffff06`

### Product / Tool Accent Spectrum
Individual tools or feature sections can adopt their own chromatic accent:
- Blue (Photo): `--app: #2f7bf5; --app-ink: #1a5bc4;` (Dark: `#7fb0ff`)
- Coral (Vector): `--app: #e8573f; --app-ink: #b83a24;` (Dark: `#ff8a70`)
- Purple (Film): `--app: #8b5cf6; --app-ink: #6a3fd6;` (Dark: `#b69cff`)
- Amber (Light): `--app: #f2a516; --app-ink: #8a5800;` (Dark: `#ffc14d`)
- Crimson (PDF): `--app: #e8204f; --app-ink: #b70228;` (Dark: `#f23a62`)
- Emerald (Fig/Design): `--app: #02da96; --app-ink: #017a54;` (Dark: `#3fe6ae`)

---

## 3. Typography Rules & Scales

Import the fonts via Google Fonts or self-host:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,100..125,100..900;1,100..125,100..900&family=Geist+Mono:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap" />
```

### Typographic Roles:
1. **Headings (`font-display`)**: `Archivo`.
   - Weight: `620` (or `600` - `700`)
   - Font stretch: `118%`
   - Tracking: `-0.035em` (tight, brutal, mechanical)
   - Line-height: `1.02` to `1.08`
2. **Editorial Contrast (`font-serif-italic`)**: `Instrument Serif`.
   - Always in italics (`font-style: italic`)
   - Used for single emphasis words inside huge Archivo headlines:
     `Built the <span class="font-serif-italic text-accent-ink">hard</span> way.`
3. **HUD Telemetry & Micro-Labels (`hud-label`)**: `Geist Mono`.
   - `font-family: var(--font-mono)`
   - `letter-spacing: 0.15em`
   - `text-transform: uppercase`
   - `font-size: 0.6875rem` (11px)
   - `font-weight: 500`
   - Used for section coordinates (`01 / LINEUP`), counters, status tags, specs.
4. **Body Copy (`font-body`)**: `Inter`.
   - Neutral, clean, relaxed line-height (`1.6` - `1.7`), muted ink color (`var(--muted)`).

---

## 4. Architectural Geometry & Construction

### 4.1 Hairline Bento Grid (1px Authentic Dividers)
Never use standard CSS grid borders that cause doubled lines or gap misalignment.
Use the **Gap-Hairline** technique:
```html
<!-- Container: background is hairline line color, gap is 1px -->
<div class="grid gap-px bg-line border border-line md:grid-cols-3">
  <!-- Cells: background is canvas bg -->
  <div class="bg-bg p-6 md:p-8">...</div>
  <div class="bg-bg p-6 md:p-8">...</div>
  <div class="bg-bg p-6 md:p-8">...</div>
</div>
```

### 4.2 Corner Drafting Crosshairs (`.tick`)
Place 11px hairline crosshairs at container corners:
```css
.tick {
  pointer-events: none;
  width: 11px;
  height: 11px;
  position: absolute;
}
.tick::before, .tick::after {
  content: "";
  background: var(--line-strong);
  position: absolute;
}
.tick::before { width: 1px; top: 0; bottom: 0; left: 5px; }
.tick-half::before { top: 5px; }
.tick::after { height: 1px; top: 5px; left: 0; right: 0; }

.tick-tl { top: -5px; left: -5px; }
.tick-tr { top: -5px; right: -5px; }
.tick-bl { bottom: -5px; left: -5px; }
.tick-br { bottom: -5px; right: -5px; }
```

### 4.3 Sticky HUD Eyebrow
Each major section is preceded by a sticky coordinate eyebrow with backdrop blur:
```html
<div class="sticky top-12 z-30 border-y border-line bg-bg/80 backdrop-blur-md">
  <div class="mx-auto flex max-w-[1280px] items-center justify-between border-x border-line px-6 py-3 md:px-10">
    <p class="hud-label text-muted">
      <span class="text-faint">03</span>
      <span aria-hidden="true" class="mx-2 text-faint">/</span>
      <span class="text-ink-strong">Principles</span>
    </p>
    <p class="hud-label hidden text-faint sm:block">SHARED BY EVERY CRAFT</p>
  </div>
</div>
```

### 4.4 Instant Snappy Inversion (`.invert-block`)
```css
.invert-block {
  transition: background-color 0.12s linear, color 0.12s linear;
}
.invert-block:hover, .invert-block[data-active="true"] {
  background-color: var(--invert-bg) !important;
  color: var(--invert-fg) !important;
}
```

---

## 5. The Precision Ruler Scrollbar

The signature feature of AUI is the engineering ruler scrollbar:
1. **Vertical Rail**: 48px width, fixed to the right or left edge (`border-left: 1px solid var(--line)`).
2. **Tick Track**: Minor hairline ticks every 1%, major ticks (wider) every 5% or 10%.
3. **Section Indicators**: Numbered anchor dots (`01`, `02`, `03`) placed dynamically at section percentages; clicking smoothly scrolls to that section.
4. **Laser Needle Indicator**: 1px horizontal cursor line with neon accent glow (`box-shadow: 0 0 6px var(--accent)`).
5. **Rolling Mechanical Odometer**: 3-column digits (`0` to `9`), translated via `transform: translateY(-N * 1em)` using cubic-bezier easing `cubic-bezier(0.2, 0.9, 0.2, 1)` to display exact scroll percentage (`042%`).
6. **Mobile Fallback**: Disabled on touch pointers or screens `< 1024px` to preserve native mobile gesture scrolling.

---

## 6. CSS Houdini Theme Animation

To avoid jarring theme flashes, register Houdini properties:
```css
@property --bg { syntax: "<color>"; inherits: true; initial-value: #f2f1ee; }
@property --bg-raised { syntax: "<color>"; inherits: true; initial-value: #faf9f7; }
@property --bg-sunken { syntax: "<color>"; inherits: true; initial-value: #e9e8e4; }
@property --ink { syntax: "<color>"; inherits: true; initial-value: #101014; }
@property --ink-strong { syntax: "<color>"; inherits: true; initial-value: #000000; }
@property --muted { syntax: "<color>"; inherits: true; initial-value: #1010149e; }
@property --line { syntax: "<color>"; inherits: true; initial-value: #10101429; }
@property --accent { syntax: "<color>"; inherits: true; initial-value: #2d81ff; }

html.theme-anim {
  transition: --bg 0.4s ease, --bg-raised 0.4s ease, --ink 0.4s ease, --line 0.4s ease, --accent 0.4s ease;
}
html.theme-anim body * {
  transition-duration: 0s !important;
}
```

---

## 7. Component Checklist for AI Agents

When asked to generate an AUI-style page, apply this execution sequence:

1. **Canvas Container**: Wrap contents in `mx-auto max-w-[1280px] border-x border-line relative`.
2. **Theme Root**: Set `:root` colors and wire the `theme-anim` class to theme toggling.
3. **Hero Structure**:
   - Telemetry status row: Pulse green dot, monospace HUD specification, revision tag.
   - Display title: Massive Archivo font with italic `Instrument Serif` contrast phrase.
   - Live metrics bar: 4-cell hairline grid with numbers and micro-labels.
4. **Marquee Ticker**: Continuous horizontal ribbon with hairline top and bottom borders.
5. **Sections**:
   - Precede each section with a sticky `AUIHUDEyebrow` (`01 / Lineup`, `02 / Principles`, etc.).
   - Pin corner crosshair ticks (`.tick-tl`, `.tick-tr`) to section boundaries.
6. **Bento Grids**: Use `gap-px bg-line` with cells having `bg-bg`.
7. **Ruler Scrollbar**: Mount `aui.js` or `AUIRulerScrollbar.tsx` for desktop users.
8. **Interactions**: Apply `.invert-block` to buttons, tags, and nav links.

---

## 8. Anti-Patterns (What NOT to Do)

- ❌ NEVER use pill-shaped rounded buttons (`rounded-full`) with soft drop-shadows (`shadow-lg`). Use razor-sharp 0px or 2px radius with hairline borders.
- ❌ NEVER use generic gray backgrounds (like `#f3f4f6` or `#1f2937`). Use authentic paper (`#f2f1ee`) or tactical obsidian (`#121316`).
- ❌ NEVER leave sections un-numbered. Every major section has a 2-digit index (`01`, `02`, `03`).
- ❌ NEVER mix multiple sans-serif fonts. Headings are strictly `Archivo`, micro-labels are `Geist Mono`, body is `Inter`.
- ❌ NEVER omit the corner registration ticks on bounded cards and sections.

---

## 9. File Reference

- Core CSS tokens & utilities: `aui.css`
- Core JavaScript controller (Ruler & Theme): `aui.js`
- Tailwind configuration: `tailwind.config.js`
- React / Next.js components: `components/react/`
- Vue components: `components/vue/`
- Live demo & testing playground: `demo/index.html`
