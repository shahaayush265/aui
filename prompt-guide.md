# AUI Prompting Guide for AI Agents

This guide provides copy-paste prompts and directives you can feed to any AI agent (Claude, Cursor, Windsurf, Gemini, OpenAI Codex, Devin, etc.) to instruct it to build websites adhering to the AUI design language.

---

## 1. Master System Prompt / Directive

When initiating a project or instructing an agent, provide this prompt:

```markdown
You are designing and building an application using the AUI (Architectural UI) Design System.
AUI is an architectural precision and high-craft digital brutalism design language based on Swiss engineering drafting boards and mechanical instrumentation.

You MUST strictly enforce these core design rules:
1. Surfaces & Canvas:
   - Light Mode: Warm technical paper (#f2f1ee), raised paper (#faf9f7), sunken well (#e9e8e4), ink body (#101014), strong ink (#000000), lines (#10101429).
   - Dark Mode: Tactical obsidian (#121316), raised dark (#101014), sunken dark (#060607), ink body (#f2f1ee), strong ink (#ffffff), lines (#f2f1ee26).
   - Electric cobalt accent (#2d81ff) with accessible ink (#1659c4 in light, #74aaff in dark).
2. Typography:
   - Headings: Archivo (font-weight: 620, font-stretch: 118%, tracking: -0.035em).
   - Editorial Accent: Instrument Serif (in italics) for single high-contrast words in titles.
   - HUD Telemetry: Geist Mono (uppercase, 0.15em letter-spacing, 11px font-size) for coordinates, tags, metrics, and labels.
   - Body: Inter (clean, relaxed line height, muted ink color).
3. Layout & Geometry:
   - 0px or 2px sharp corners (never rounded pill buttons).
   - Hairline Bento Grids using container "gap-px bg-line border border-line" and children "bg-bg".
   - Place 11px corner registration crosshairs (.tick) on all major containers.
   - Sticky HUD Eyebrows (e.g. "01 / LINEUP") with backdrop blur at section headers.
4. Interactions & Motion:
   - Snappy 120ms contrast inversion on hover (.invert-block).
   - Continuous marquee ribbon tickers with hairline borders.
   - Precision ruler scrollbar with rolling 3-digit mechanical odometer readout (000% - 100%).
   - CSS Houdini smooth color interpolation on theme toggle.
```

---

## 2. Component Scaffolding Prompt

Use this prompt when asking an agent to generate a specific page or section:

```markdown
Create an AUI-style [SECTION_NAME / PAGE_NAME] for [PRODUCT/SERVICE].
Include:
1. Sticky HUD Eyebrow with section index (e.g., "03 / SPECIFICATIONS") and status tag.
2. Section heading with Archivo bold display and an Instrument Serif italic accent word.
3. Corner registration ticks (.tick) at the top and bottom corners.
4. A 3-column hairline bento grid (gap-px bg-line) with technical specs and micro-labels.
5. Invert-block CTA button that inverts from border/bg to solid high-contrast on hover.
```
