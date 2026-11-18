import React from 'react';

export interface AUITickerMarqueeProps {
  items: string[];
  separator?: string;
  speedSec?: number;
  className?: string;
}

export const AUITickerMarquee: React.FC<AUITickerMarqueeProps> = ({
  items,
  separator = '✦',
  speedSec = 32,
  className = ''
}) => {
  const content = items.map((item, idx) => (
    <span key={idx} className="inline-flex items-center gap-6 px-4">
      <span className="font-mono text-xs tracking-widest uppercase text-ink-strong font-semibold">
        {item}
      </span>
      <span className="text-faint text-xs" aria-hidden="true">
        {separator}
      </span>
    </span>
  ));

  return (
    <div className={`marquee bg-bg-raised py-3 ${className}`}>
      <div
        className="marquee-track flex items-center whitespace-nowrap"
        style={{ animationDuration: `${speedSec}s` }}
      >
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  );
};
