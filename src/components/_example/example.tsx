import { type VariantProps, cva } from 'cva';
import * as React from 'react';

const exampleVariants = cva('', {
  variants: {
    variant: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ExampleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof exampleVariants> {
  asChild?: boolean;
}

const Example = ({ className, children, variant, asChild = false, ...props }: ExampleProps) => {
  return (
    <div className={exampleVariants({ variant, className })} {...props}>
      {children}
    </div>
  );
};

Example.displayName = 'Example';

export { Example };
