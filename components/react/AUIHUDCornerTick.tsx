import React from 'react';

export type TickPosition = 'tl' | 'tr' | 'bl' | 'br' | 'all';

export interface AUIHUDCornerTickProps {
  position?: TickPosition;
  half?: boolean;
  className?: string;
}

export const AUIHUDCornerTick: React.FC<AUIHUDCornerTickProps> = ({
  position = 'all',
  half = true,
  className = ''
}) => {
  const halfClass = half ? 'tick-half' : '';

  if (position === 'all') {
    return (
      <>
        <span aria-hidden="true" className={`tick ${halfClass} tick-tl ${className}`} />
        <span aria-hidden="true" className={`tick ${halfClass} tick-tr ${className}`} />
        <span aria-hidden="true" className={`tick ${halfClass} tick-bl ${className}`} />
        <span aria-hidden="true" className={`tick ${halfClass} tick-br ${className}`} />
      </>
    );
  }

  const posClass = `tick-${position}`;
  return (
    <span
      aria-hidden="true"
      className={`tick ${halfClass} ${posClass} ${className}`}
    />
  );
};
