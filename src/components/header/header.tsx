import { cn } from '@/lib/utils';
import { gql } from '../../__generated__';
import { motion, useMotionTemplate, useTransform } from 'framer-motion';
import { MenuIcon } from '@/components/icons';
import { PrimaryMenuItemFragmentFragment } from '../../__generated__/graphql';

import { Button, Container, Logo, Sheet, SheetContent, SheetTrigger } from '@/components';

import { useBoundedScroll } from '@/hooks/use-bounded-scroll';

import Link from 'next/link';
import { buttonVariants } from '../button/Button';

interface HeaderProps extends React.HTMLProps<HTMLElement> {
  menuItems: PrimaryMenuItemFragmentFragment[];
}

export const Header = ({ menuItems }: HeaderProps) => {
  let { scrollYBoundedProgress } = useBoundedScroll(200);
  let scrollYBoundedProgressThrottled = useTransform(
    scrollYBoundedProgress,
    [0, 0.6, 1],
    [0, 0, 1]
  );

  return (
    <motion.header
      style={{
        height: useTransform(scrollYBoundedProgressThrottled, [0, 1], [100, 70]),
      }}
      className="fixed inset-x-0 flex h-20 bg-inherit !font-sans"
    >
      <Container className="flex w-full items-center gap-8 py-4">
        <motion.div
          className="absolute z-50"
          style={{
            scale: useTransform(scrollYBoundedProgressThrottled, [0, 1], [1, 0.8]),
          }}
        >
          <Button asChild variant="accent" size="reset" className="rounded !bg-transparent">
            <Link href={'/'} className="flex h-full w-full items-center justify-center p-1">
              <Logo className="aspect-auto" />
            </Link>
          </Button>
        </motion.div>

        <motion.div className="ml-auto hidden lg:block">
          <nav
            className={' flex-col gap-4 text-right'}
            role="navigation"
            aria-label={`${menuItems[0]?.menu.node.name} menu`}
          >
            <ul className={cn('flex items-end justify-center gap-5 text-sm font-bold')}>
              {menuItems.map((item) => {
                const { id, path, label } = item;
                return (
                  <li key={id ?? ''} className="">
                    <Button
                      asChild
                      variant="accent"
                      size="reset"
                      className="h-3 rounded !bg-transparent p-3 text-xl"
                    >
                      <Link className="" href={path ?? ''}>
                        {label ?? ''}
                      </Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </motion.div>

        <div className="flex w-full flex-1 items-center justify-end lg:hidden">
          <Sheet>
            <SheetTrigger className="rounded outline-none ring-2 ring-transparent ring-offset-4 focus-visible:ring-accent">
              <MenuIcon className="h-8 w-8 flex-1 text-foreground" />
            </SheetTrigger>

            <SheetContent className="pt-28">
              <nav
                className={' flex-col gap-4 text-right'}
                role="navigation"
                aria-label={`${menuItems[0]?.menu.node.name} menu`}
              >
                <ul
                  className={cn(
                    'flex flex-col items-end justify-center gap-8 text-sm font-bold uppercase'
                  )}
                >
                  {menuItems.map((item) => {
                    const { id, path, label } = item;
                    return (
                      <li key={id ?? ''} className="">
                        <Button
                          asChild
                          variant="foreground"
                          size="reset"
                          className="!bg-transparent px-5 text-5xl hover:text-foreground/50"
                        >
                          <Link className="" href={path ?? ''}>
                            {label ?? ''}
                          </Link>
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </motion.header>
  );
};

Header.fragments = {
  generalSettingsFragment: gql(`
    fragment HeaderGeneralSettingsFragment on GeneralSettings {
      title
      description
    }
  `),
  menuItemFragment: gql(`
    fragment PrimaryMenuItemFragment on MenuItem {
      id
      uri
      path
      label
      parentId
      cssClasses
      menu {
        node {
          name
        }
      }
    }
  `),
};
