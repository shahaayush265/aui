import React from 'react';
import { AUIHUDCornerTick } from './AUIHUDCornerTick';

export interface AUIHeroProps {
  eyebrowText?: string;
  badge?: string;
  titlePrimary: string;
  titleItalic?: string;
  titleSecondary?: string;
  description: string;
  actions?: React.ReactNode;
  statusMetrics?: { label: string; value: string }[];
  className?: string;
}

export const AUIHero: React.FC<AUIHeroProps> = ({
  eyebrowText = 'SYSTEM ARCHITECTURE // V1.0',
  badge = 'OPEN CRAFT',
  titlePrimary,
  titleItalic,
  titleSecondary,
  description,
  actions,
  statusMetrics = [],
  className = ''
}) => {
  return (
    <section className={`relative border-b border-line bg-bg ${className}`}>
      <div className="relative mx-auto max-w-[1280px] border-x border-line px-6 py-20 md:px-12 md:py-32">
        <AUIHUDCornerTick position="all" half={true} />

        {/* Top Telemetry Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-line">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="hud-label text-muted">{eyebrowText}</span>
          </div>
          {badge && (
            <span className="hud-label border border-line bg-bg-raised px-2.5 py-1 text-accent-ink">
              {badge}
            </span>
          )}
        </div>

        {/* Display Typography Header */}
        <div className="mt-12 max-w-4xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-ink-strong sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02]">
            {titlePrimary}{' '}
            {titleItalic && (
              <span className="font-serif-italic font-normal text-accent-ink">
                {titleItalic}
              </span>
            )}{' '}
            {titleSecondary}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl font-normal">
            {description}
          </p>
        </div>

        {/* Action Controls */}
        {actions && <div className="mt-10 flex flex-wrap items-center gap-4">{actions}</div>}

        {/* Metrics Grid */}
        {statusMetrics.length > 0 && (
          <div className="mt-16 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
            {statusMetrics.map((m, idx) => (
              <div key={idx} className="bg-bg p-4 md:p-6">
                <p className="hud-label text-faint">{m.label}</p>
                <p className="mt-2 font-display text-2xl font-semibold text-ink-strong md:text-3xl">
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
