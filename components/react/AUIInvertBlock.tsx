import React from 'react';

export interface AUIInvertBlockProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'button' | 'a' | 'div' | 'span';
  href?: string;
  active?: boolean;
  variant?: 'outline' | 'ghost' | 'solid';
  children: React.ReactNode;
  className?: string;
}

export const AUIInvertBlock: React.FC<AUIInvertBlockProps> = ({
  as: Component = 'div',
  href,
  active = false,
  variant = 'outline',
  children,
  className = '',
  ...props
}) => {
  const variantClasses = {
    outline: 'border border-line bg-bg text-ink',
    ghost: 'bg-transparent text-ink',
    solid: 'bg-invert-bg text-invert-fg'
  }[variant];

  return (
    // @ts-expect-error dynamic component type
    <Component
      href={href}
      data-active={active ? 'true' : 'false'}
      className={`invert-block inline-flex items-center justify-center font-mono text-xs tracking-wider uppercase px-4 py-2 cursor-pointer transition-colors ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
