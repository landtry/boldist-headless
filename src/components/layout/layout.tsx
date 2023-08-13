import { cn } from '@/lib/utils';
import React from 'react';

interface LayoutProps extends React.HTMLProps<HTMLElement> {}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('min-h-screen bg-background font-sans antialiased', className)}>
      {children}
    </div>
  );
};
