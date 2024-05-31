import type { FC, ReactNode } from 'react';

import styles from './Wrapper.module.scss';

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper: FC<WrapperProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
