/**
 * AUI (Architectural User Interface) — Client Controller
 * Precision Ruler Scrollbar, Rolling Odometer, Corner Ticks, and Houdini Theme Manager
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AUI = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ------------------------------------------------------------------------
  // Helper Utilities
  // ------------------------------------------------------------------------
  function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  // ------------------------------------------------------------------------
  // 1. Theme Manager with Houdini Smooth Transition
  // ------------------------------------------------------------------------
  const Theme = {
    STORAGE_KEY: 'aui-theme-pref',

    init: function () {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') {
        this.setTheme(saved, false);
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(prefersDark ? 'dark' : 'light', false);
      }

      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          if (!localStorage.getItem(this.STORAGE_KEY)) {
            this.setTheme(e.matches ? 'dark' : 'light', true);
          }
        });
      }
    },

    getTheme: function () {
      return document.documentElement.getAttribute('data-theme') || 'light';
    },

    setTheme: function (theme, animate = true) {
      const html = document.documentElement;
      if (animate) {
        html.classList.add('theme-anim');
      }
      html.setAttribute('data-theme', theme);
      localStorage.setItem(this.STORAGE_KEY, theme);

      if (animate) {
        window.setTimeout(() => {
          html.classList.remove('theme-anim');
        }, 450);
      }

      window.dispatchEvent(new CustomEvent('aui:theme-change', { detail: { theme } }));
    },

    toggle: function () {
      const current = this.getTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      this.setTheme(next, true);
      return next;
    }
  };

  // ------------------------------------------------------------------------
  // 2. Corner Ticks Generator
  // ------------------------------------------------------------------------
  const Ticks = {
    init: function () {
      const elements = document.querySelectorAll('[data-aui-ticks]');
      elements.forEach(el => this.attach(el));
    },

    attach: function (element) {
      if (!element || element.querySelector('.tick-tl')) return;
      element.style.position = element.style.position || 'relative';

      const positions = ['tick-tl', 'tick-tr', 'tick-bl', 'tick-br'];
      positions.forEach(pos => {
        const tick = document.createElement('span');
        tick.className = `tick tick-half ${pos}`;
        tick.setAttribute('aria-hidden', 'true');
        element.appendChild(tick);
      });
    }
  };

  // ------------------------------------------------------------------------
  // 3. Tactile Audio Feedback (Synthesized via Web Audio API)
  // ------------------------------------------------------------------------
  const Sound = {
    ctx: null,
    enabled: true,

    getAudioContext: function () {
      if (!this.ctx && typeof AudioContext !== 'undefined') {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    },

    click: function (freq = 800, duration = 0.015) {
      if (!this.enabled) return;
      try {
        const ctx = this.getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {
        // Audio might be blocked by autoplay policies
      }
    }
  };

  // ------------------------------------------------------------------------
  // 4. Precision Ruler Scrollbar with Rolling Mechanical Odometer
  // ------------------------------------------------------------------------
  class Ruler {
    constructor(options = {}) {
      this.options = Object.assign({
        side: 'right',        // 'right' or 'left'
        railWidth: 48,        // in pixels
        minorStep: 1,         // percentage step for minor ticks
        majorStep: 5,         // percentage step for major ticks
        sectionsSelector: 'section[id], [data-ruler-section]',
        showOdometer: true,
        enableScrub: true
      }, options);

      this.rail = null;
      this.cursor = null;
      this.digitsContainer = null;
      this.digitCols = [];
      this.prevDigits = [-1, -1, -1];
      this.isDragging = false;
      this.sections = [];
      this.rafId = null;

      this.init();
    }

    init() {
      // Check if fine pointer and desktop screen
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      const isMobile = window.innerWidth < 1024;
      if (isTouch || isMobile) {
        // Fallback: don't override native scrollbar on mobile
        return;
      }

      document.documentElement.dataset.ruler = 'on';
      document.documentElement.dataset.rulerSide = this.options.side;
      document.documentElement.style.setProperty('--ruler-rail', `${this.options.railWidth}px`);

      this.createDOM();
      this.cacheSections();
      this.bindEvents();
      this.update(true);
    }

    createDOM() {
      // Remove any existing rail
      const existing = document.querySelector('.aui-ruler-rail');
      if (existing) existing.remove();

      const rail = document.createElement('aside');
      rail.className = 'aui-ruler-rail';
      rail.setAttribute('aria-label', 'Precision Scroll Gauge');

      // Ticks container
      const track = document.createElement('div');
      track.className = 'aui-ruler-ticks-track';

      for (let pct = 0; pct <= 100; pct += this.options.minorStep) {
        const isMajor = (pct % this.options.majorStep === 0);
        const tick = document.createElement('span');
        tick.className = 'aui-ruler-tick-mark';
        tick.dataset.major = isMajor ? 'true' : 'false';
        tick.style.top = `${pct}%`;
        track.appendChild(tick);
      }
      rail.appendChild(track);

      // Section markers container
      this.sectionsTrack = document.createElement('div');
      this.sectionsTrack.className = 'aui-ruler-sections-track';
      rail.appendChild(this.sectionsTrack);

      // Cursor indicator with laser needle & odometer
      const cursor = document.createElement('div');
      cursor.className = 'aui-ruler-cursor';
      cursor.innerHTML = `
        <span class="aui-ruler-needle"></span>
        <div class="aui-ruler-readout">
          <span class="ruler-digits">
            <span class="ruler-digit-col" data-col="0"></span>
            <span class="ruler-digit-col" data-col="1"></span>
            <span class="ruler-digit-col" data-col="2"></span>
          </span>
          <span class="ruler-unit">%</span>
        </div>
      `;
      rail.appendChild(cursor);

      document.body.appendChild(rail);
      this.rail = rail;
      this.cursor = cursor;

      // Populate 0-9 digits in columns
      const cols = cursor.querySelectorAll('.ruler-digit-col');
      cols.forEach(col => {
        let html = '';
        for (let i = 0; i <= 9; i++) {
          html += `<span>${i}</span>`;
        }
        col.innerHTML = html;
        this.digitCols.push(col);
      });
    }

    cacheSections() {
      const elements = document.querySelectorAll(this.options.sectionsSelector);
      this.sections = [];
      this.sectionsTrack.innerHTML = '';

      elements.forEach((el, index) => {
        const id = el.id || el.getAttribute('data-ruler-section') || `sec-${index}`;
        const label = el.getAttribute('data-ruler-title') || id.replace(/[-_]/g, ' ');
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;

        const mark = document.createElement('button');
        mark.className = 'aui-ruler-section-mark';
        mark.textContent = String(index + 1).padStart(2, '0');
        mark.title = label;
        mark.addEventListener('click', (e) => {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
          Sound.click(1000);
        });

        this.sectionsTrack.appendChild(mark);
        this.sections.push({ el, id, mark, top });
      });
    }

    bindEvents() {
      const onScroll = () => {
        if (!this.rafId) {
          this.rafId = requestAnimationFrame(() => {
            this.update();
            this.rafId = null;
          });
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', () => {
        this.cacheSections();
        this.update(true);
      });

      // Drag scrub support
      if (this.options.enableScrub && this.rail) {
        const onPointerDown = (e) => {
          if (e.button !== 0) return;
          this.isDragging = true;
          this.handleScrub(e);
          document.body.style.userSelect = 'none';
          window.addEventListener('pointermove', onPointerMove);
          window.addEventListener('pointerup', onPointerUp);
        };

        const onPointerMove = (e) => {
          if (!this.isDragging) return;
          this.handleScrub(e);
        };

        const onPointerUp = () => {
          this.isDragging = false;
          document.body.style.userSelect = '';
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('pointerup', onPointerUp);
        };

        this.rail.addEventListener('pointerdown', onPointerDown);
      }
    }

    handleScrub(e) {
      const railRect = this.rail.getBoundingClientRect();
      const pct = clamp((e.clientY - railRect.top) / railRect.height, 0, 1);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: pct * maxScroll,
        behavior: 'auto'
      });
    }

    update(force = false) {
      const docH = document.documentElement.scrollHeight;
      const vh = window.innerHeight;
      const maxScroll = Math.max(1, docH - vh);
      const scrollY = window.scrollY;
      const pct = clamp(scrollY / maxScroll, 0, 1);
      const pct100 = Math.round(pct * 100);

      // Move Cursor Needle
      if (this.cursor) {
        const railH = this.rail.clientHeight;
        const cursorY = pct * railH;
        this.cursor.style.transform = `translate3d(0, ${cursorY}px, 0)`;

        // Adjust readout placement near bottom
        const readout = this.cursor.querySelector('.aui-ruler-readout');
        if (readout) {
          if (cursorY > railH - 24) {
            readout.style.top = '-16px';
          } else {
            readout.style.top = '4px';
          }
        }
      }

      // Update Rolling Digits
      if (this.digitCols.length === 3) {
        const str = String(pct100).padStart(3, '0');
        for (let i = 0; i < 3; i++) {
          const digit = parseInt(str[i], 10);
          if (force || this.prevDigits[i] !== digit) {
            this.prevDigits[i] = digit;
            this.digitCols[i].style.transform = `translateY(-${digit * 1}em)`;
          }
        }
      }

      // Update Section Markers positioning & active state
      if (this.sections.length) {
        const railH = this.rail.clientHeight;
        this.sections.forEach(sec => {
          const secPct = clamp(sec.top / docH, 0, 0.98);
          sec.mark.style.top = `${secPct * railH}px`;

          const rect = sec.el.getBoundingClientRect();
          const isActive = rect.top <= vh * 0.4 && rect.bottom >= vh * 0.2;
          sec.mark.dataset.active = isActive ? 'true' : 'false';
        });
      }
    }

    destroy() {
      if (this.rail) this.rail.remove();
      delete document.documentElement.dataset.ruler;
      delete document.documentElement.dataset.rulerSide;
    }
  }

  // ------------------------------------------------------------------------
  // Automatic Initialization on DOM Ready
  // ------------------------------------------------------------------------
  function autoInit() {
    Theme.init();
    Ticks.init();

    // Initialize ruler if not explicitly disabled
    if (document.documentElement.dataset.ruler !== 'off') {
      window.auiRuler = new Ruler();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  return {
    Theme,
    Ticks,
    Sound,
    Ruler
  };
}));
