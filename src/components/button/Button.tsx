import React, { RefObject } from 'react';
import { cva, type VariantProps } from 'cva';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { FocusRing, useButton } from 'react-aria';

const buttonVariants = cva(
  'inline-flex touch-none select-none items-center justify-center rounded-full outline-none transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground hover:bg-background/80',
        accent: 'bg-accent text-accent-foreground hover:bg-accent/80',
        muted: 'bg-muted text-muted-foreground hover:bg-muted/80',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        foreground: 'bg-foreground text-foreground hover:bg-foreground/80',
      },
      size: {
        default: 'h-20 px-10 pb-5 pt-4 text-2xl font-bold ',
        reset: '',
      },
      isPressed: {
        true: true,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      { variant: 'default', isPressed: true, className: '!bg-background/60' },
      { variant: 'accent', isPressed: true, className: '!bg-accent/60' },
      { variant: 'muted', isPressed: true, className: '!bg-muted/60' },
      { variant: 'primary', isPressed: true, className: '!bg-primary/60' },
      { variant: 'secondary', isPressed: true, className: '!bg-secondary/60' },
    ],
  }
);

const focusVariants = cva('ring-2 ring-offset-4', {
  variants: {
    variant: {
      default: 'ring-background',
      accent: 'ring-accent',
      muted: 'ring-muted',
      primary: 'ring-primary',
      secondary: 'ring-secondary',
      foreground: 'ring-foreground ring-offset-black/90',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, onClick, variant, asChild = false, size, ...props }, ref) => {
    const { buttonProps, isPressed } = useButton(
      // TODO: Investigate onClick type for React-Aria
      { onPress: onClick as (e: any) => void, ...props },
      ref as RefObject<Element>
    );
    const Comp = asChild ? Slot : 'button';

    return (
      <FocusRing focusRingClass={cn(focusVariants({ variant }))}>
        <Comp
          className={cn(buttonVariants({ variant, size, isPressed, className }))}
          {...buttonProps}
        >
          {children}
        </Comp>
      </FocusRing>
    );
  }
);

export { Button, buttonVariants };
