import type { FC } from 'react';

import styles from './MainText.module.scss';

export const MainText: FC = () => {
  return <h1 className={styles.title}>Выберите строение для просмотра оборудования</h1>;
};
