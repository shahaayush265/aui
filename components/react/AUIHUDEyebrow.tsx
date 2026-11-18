import React from 'react';

export interface AUIHUDEyebrowProps {
  index: string | number;
  title: string;
  subtitle?: string;
  tag?: string;
  sticky?: boolean;
  className?: string;
}

export const AUIHUDEyebrow: React.FC<AUIHUDEyebrowProps> = ({
  index,
  title,
  subtitle,
  tag,
  sticky = true,
  className = ''
}) => {
  const formattedIndex = typeof index === 'number' ? String(index).padStart(2, '0') : index;
  const stickyClass = sticky ? 'sticky top-0 z-30' : 'relative';

  return (
    <div
      className={`${stickyClass} border-y border-line bg-bg/80 backdrop-blur-md transition-colors ${className}`}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-3 md:px-10">
        <p className="hud-label text-muted flex items-center">
          <span className="text-faint">{formattedIndex}</span>
          <span aria-hidden="true" className="mx-2 text-faint">/</span>
          <span className="text-ink-strong font-semibold">{title}</span>
        </p>

        <div className="flex items-center gap-4">
          {subtitle && (
            <p className="hud-label hidden text-faint sm:block">
              {subtitle}
            </p>
          )}
          {tag && (
            <span className="hud-label border border-line px-2 py-0.5 text-accent-ink bg-bg-raised">
              {tag}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
