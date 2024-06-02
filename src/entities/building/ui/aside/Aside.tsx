import { clsx } from 'clsx';
import type { FC, ReactNode } from 'react';

import styles from './Aside.module.scss';

interface AsideProps {
  children: ReactNode;
  isOpened: boolean;
}

export const Aside: FC<AsideProps> = ({ children, isOpened }) => {
  return <aside
    className={clsx(styles.aside, {
      [styles.opened]: isOpened,
    })}
  >{children}</aside>;
};
