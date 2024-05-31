import type { FC, ReactNode } from 'react';

import styles from './Aside.module.scss';

interface AsideProps {
  children: ReactNode;
}

export const Aside: FC<AsideProps> = ({ children }) => {
  return <aside className={styles.aside}>{children}</aside>;
};
