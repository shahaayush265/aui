import React, { useEffect, useRef, useState, useMemo } from 'react';

export interface SectionMarker {
  id: string;
  label?: string;
}

export interface AUIRulerScrollbarProps {
  side?: 'left' | 'right';
  railWidth?: number;
  minorStep?: number;
  majorStep?: number;
  sections?: SectionMarker[];
  enableScrub?: boolean;
  className?: string;
}

export const AUIRulerScrollbar: React.FC<AUIRulerScrollbarProps> = ({
  side = 'right',
  railWidth = 48,
  minorStep = 1,
  majorStep = 5,
  sections = [],
  enableScrub = true,
  className = ''
}) => {
  const [mounted, setMounted] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const digitColsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const prevDigits = useRef<number[]>([-1, -1, -1]);
  const isDragging = useRef<boolean>(false);

  useEffect(() => {
    // Only mount on desktop with fine pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = window.innerWidth < 1024;
    if (isTouch || isMobile) return;

    setMounted(true);
    document.documentElement.dataset.ruler = 'on';
    document.documentElement.dataset.rulerSide = side;
    document.documentElement.style.setProperty('--ruler-rail', `${railWidth}px`);

    return () => {
      delete document.documentElement.dataset.ruler;
      delete document.documentElement.dataset.rulerSide;
    };
  }, [side, railWidth]);

  // Generate tick marks
  const ticks = useMemo(() => {
    const list = [];
    for (let pct = 0; pct <= 100; pct += minorStep) {
      list.push({
        pct,
        isMajor: pct % majorStep === 0
      });
    }
    return list;
  }, [minorStep, majorStep]);

  useEffect(() => {
    if (!mounted) return;

    const updateScroll = () => {
      const docH = document.documentElement.scrollHeight;
      const vh = window.innerHeight;
      const maxScroll = Math.max(1, docH - vh);
      const scrollY = window.scrollY;
      const pct = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      const pct100 = Math.round(pct * 100);

      // Move Cursor Needle
      if (cursorRef.current && railRef.current) {
        const railH = railRef.current.clientHeight;
        const cursorY = pct * railH;
        cursorRef.current.style.transform = `translate3d(0, ${cursorY}px, 0)`;

        // Adjust readout placement near bottom edge
        const readout = cursorRef.current.querySelector('.aui-ruler-readout') as HTMLElement;
        if (readout) {
          readout.style.top = cursorY > railH - 24 ? '-16px' : '4px';
        }
      }

      // Roll mechanical odometer digits
      const str = String(pct100).padStart(3, '0');
      for (let i = 0; i < 3; i++) {
        const digit = parseInt(str[i], 10);
        const col = digitColsRef.current[i];
        if (col && prevDigits.current[i] !== digit) {
          prevDigits.current[i] = digit;
          col.style.transform = `translateY(-${digit * 1}em)`;
        }
      }

      // Check active section
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= vh * 0.4 && rect.bottom >= vh * 0.2) {
            setActiveSectionId(sec.id);
            break;
          }
        }
      }
    };

    let rafId: number | null = null;
    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          updateScroll();
          rafId = null;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mounted, sections]);

  // Drag scrub interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!enableScrub || e.button !== 0 || !railRef.current) return;
    isDragging.current = true;
    document.body.style.userSelect = 'none';

    const scrub = (clientY: number) => {
      if (!railRef.current) return;
      const rect = railRef.current.getBoundingClientRect();
      const pct = Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: pct * maxScroll, behavior: 'auto' });
    };

    scrub(e.clientY);

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (isDragging.current) scrub(moveEvent.clientY);
    };

    const onPointerUp = () => {
      isDragging.current = false;
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  if (!mounted) return null;

  return (
    <aside
      ref={railRef}
      onPointerDown={handlePointerDown}
      className={`aui-ruler-rail ${className}`}
      style={{ width: railWidth }}
      aria-label="Precision Scroll Gauge"
    >
      {/* Ticks Track */}
      <div className="aui-ruler-ticks-track">
        {ticks.map((t) => (
          <span
            key={t.pct}
            className="aui-ruler-tick-mark"
            data-major={t.isMajor ? 'true' : 'false'}
            style={{ top: `${t.pct}%` }}
          />
        ))}
      </div>

      {/* Section Indicators */}
      <div className="aui-ruler-sections-track">
        {sections.map((sec, idx) => (
          <button
            key={sec.id}
            type="button"
            className="aui-ruler-section-mark"
            data-active={activeSectionId === sec.id ? 'true' : 'false'}
            onClick={() => {
              const el = document.getElementById(sec.id);
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            title={sec.label || sec.id}
          >
            {String(idx + 1).padStart(2, '0')}
          </button>
        ))}
      </div>

      {/* Laser Cursor Needle with Mechanical Rolling Digits */}
      <div ref={cursorRef} className="aui-ruler-cursor">
        <span className="aui-ruler-needle" />
        <div className="aui-ruler-readout">
          <span className="ruler-digits">
            {[0, 1, 2].map((colIdx) => (
              <span
                key={colIdx}
                ref={(el) => { digitColsRef.current[colIdx] = el; }}
                className="ruler-digit-col"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            ))}
          </span>
          <span style={{ marginLeft: 2 }}>%</span>
        </div>
      </div>
    </aside>
  );
};
