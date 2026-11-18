import React from 'react';

export interface AUIHairlineGridProps {
  columns?: 1 | 2 | 3 | 4 | 6;
  children: React.ReactNode;
  className?: string;
}

export const AUIHairlineGrid: React.FC<AUIHairlineGridProps> = ({
  columns = 3,
  children,
  className = ''
}) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
  }[columns];

  return (
    <div className={`hairline-grid grid ${colClasses} ${className}`}>
      {children}
    </div>
  );
};

export interface AUIHairlineCellProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

export const AUIHairlineCell: React.FC<AUIHairlineCellProps> = ({
  children,
  className = '',
  padding = 'md'
}) => {
  const padClasses = {
    none: '',
    sm: 'p-4 md:p-6',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-12'
  }[padding];

  return (
    <div className={`relative bg-bg ${padClasses} ${className}`}>
      {children}
    </div>
  );
};
