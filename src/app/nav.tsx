'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavMenu } from 'preline-react/lib/menu';
import { useNonFirstEffect } from 'preline-react/lib/util';
import { MenuItemProps } from 'preline-react/src/menu/common';
import { FC, useState } from 'react';
import { BsAirplaneFill, BsBookmarkFill, BsPersonFill } from 'react-icons/bs';

const MenuItems: MenuItemProps[] = [
  {
    name: <Link href='/posts'>SSR & CSR Table</Link>,
    icon: <BsBookmarkFill />,
    key: '/post',
  },
  {
    name: <Link href='/login'>Login Page</Link>,
    icon: <BsPersonFill />,
    key: '/login',
  },
  {
    name: <Link href='/project'>Server Side Auth</Link>,
    icon: <BsAirplaneFill />,
    key: '/project',
  },
];

// 搜索菜单项
function findMenuPath(marr: (MenuItemProps | '-')[], pn: string): MenuItemProps[] {
  for (let i = 0; i < marr.length; i += 1) {
    const m = marr[i];
    if (m === '-') continue;
    if (m.key === pn) {
      return [m];
    }
    if (m.children?.length) {
      const result = findMenuPath(m.children, pn);
      if (result.length) {
        return [m, ...result];
      }
    }
  }
  return [];
}

export const Nav: FC = () => {
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState<string[]>(() => {
    return MenuItems.filter((item) => item.children?.length).map((item) => item.key);
  });
  const [selectKeys, setSelectKeys] = useState<string[]>(pathname ? [pathname] : []);

  useNonFirstEffect(() => {
    setSelectKeys(pathname ? [pathname] : []);
    if (!pathname) {
      return;
    }
    const mpath = findMenuPath(MenuItems, pathname);
    const keys = mpath.filter((menu) => !!menu.children?.length).map((menu) => menu.key);
    setOpenKeys((oldKeys) => [...new Set([...oldKeys, ...keys]).values()]);
  }, [pathname]);

  return (
    <NavMenu
      items={MenuItems}
      openKeys={openKeys}
      selectedKeys={selectKeys}
      onSelect={(keys) => {
        const lk = keys[keys.length];
        if (lk?.startsWith('/')) {
          setSelectKeys([lk]);
        }
      }}
      onOpenChange={(keys) => {
        setOpenKeys(keys);
      }}
      className='w-[240px]'
    />
  );
};
