import React from 'react';

export type ToolAccent = 'blue' | 'coral' | 'purple' | 'amber' | 'crimson' | 'emerald' | 'teal' | 'chartreuse';

export interface AUIToolBadgeProps {
  name: string;
  category: string;
  accent?: ToolAccent;
  icon?: React.ReactNode;
  version?: string;
  description?: string;
  href?: string;
  className?: string;
}

export const AUIToolBadge: React.FC<AUIToolBadgeProps> = ({
  name,
  category,
  accent = 'blue',
  icon,
  version = 'v1.0',
  description,
  href,
  className = ''
}) => {
  const accentClass = `app-${accent}`;
  const Wrapper = href ? 'a' : 'div';

  return (
    // @ts-expect-error dynamic wrapper element
    <Wrapper
      href={href}
      className={`group relative block border border-line bg-bg p-6 transition-all hover:border-line-strong ${accentClass} ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center border border-line bg-bg-raised text-accent-ink transition-transform group-hover:scale-105">
          {icon || <span className="font-mono text-sm font-bold">{name.substring(0, 2).toUpperCase()}</span>}
        </div>
        <div className="text-right">
          <p className="hud-label text-faint">{version}</p>
          <p className="hud-label mt-1 text-accent-ink">{category}</p>
        </div>
      </div>

      <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-ink-strong group-hover:text-accent-ink transition-colors">
        {name}
      </h3>

      {description && (
        <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
          {description}
        </p>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs font-mono text-faint">
        <span>NATIVE / WASM</span>
        <span className="text-accent-ink opacity-0 transition-opacity group-hover:opacity-100">
          EXPLORE →
        </span>
      </div>
    </Wrapper>
  );
};
