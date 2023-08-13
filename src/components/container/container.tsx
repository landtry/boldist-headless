import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}
export const Container: React.FC<ContainerProps> = ({ className, ...props }) => {
  return <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props} />;
};
