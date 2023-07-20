import { gql } from '../../__generated__';

import Link from 'next/link';

import {
  HeaderGeneralSettingsFragmentFragment,
  PrimaryMenuItemFragmentFragment,
} from '../../__generated__/graphql';

type HeaderProps = {
  menuItems: PrimaryMenuItemFragmentFragment[];
};

export default function Header({ menuItems }: HeaderProps) {
  return (
    <header className={'bg-gray-100 py-4'}>
      <div className="container flex items-center">
        <Link href="/" className={''}>
          <h2 className={''}>{'Boldist'}</h2>
        </Link>

        <nav className={'ml-auto'}>
          <ul className="flex gap-8">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link href={item.uri}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

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
