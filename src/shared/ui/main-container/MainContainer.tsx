import type { FC, ReactNode } from 'react';

import styles from './MainContainer.module.scss';

interface MainContainerProps {
  children: ReactNode;
}

export const MainContainer: FC<MainContainerProps> = ({ children }) => {
  return <main className={styles.mainContainer}>{children}</main>;
};
