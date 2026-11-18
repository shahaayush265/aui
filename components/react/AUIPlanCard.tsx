import React from 'react';

export interface AUIPlanCardProps {
  planTier: 'basic' | 'pro' | 'max' | 'custom';
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlight?: boolean;
  ctaText?: string;
  onSelect?: () => void;
  className?: string;
}

export const AUIPlanCard: React.FC<AUIPlanCardProps> = ({
  planTier,
  title,
  price,
  period = '/ month',
  description,
  features,
  highlight = false,
  ctaText = 'Get Started',
  onSelect,
  className = ''
}) => {
  const tierClass = `plan-${planTier}`;

  return (
    <div
      data-highlight={highlight ? 'true' : 'false'}
      className={`plan-card ${tierClass} flex flex-col justify-between p-6 md:p-8 ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="plan-badge">{title}</span>
          {highlight && (
            <span className="hud-label text-accent-ink font-semibold">
              RECOMMENDED
            </span>
          )}
        </div>

        <div className="mt-6 flex items-baseline gap-2">
          <span className="font-display text-4xl font-semibold text-ink-strong md:text-5xl">
            {price}
          </span>
          {period && <span className="font-mono text-xs text-muted">{period}</span>}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted">{description}</p>

        <div className="my-8 h-px w-full bg-line" />

        <ul className="space-y-3">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-ink">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-current opacity-80" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={onSelect}
        className="invert-block mt-8 w-full border border-line py-3 font-mono text-xs uppercase tracking-widest text-ink bg-bg transition-colors hover:bg-invert-bg hover:text-invert-fg"
      >
        {ctaText}
      </button>
    </div>
  );
};
