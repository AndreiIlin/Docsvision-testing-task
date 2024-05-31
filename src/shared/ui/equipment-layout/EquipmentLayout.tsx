import type { FC, ReactNode } from 'react';

import styles from './EquipmentLayout.module.scss';

interface EquipmentLayoutProps {
  children: ReactNode;
}

export const EquipmentLayout: FC<EquipmentLayoutProps> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};
