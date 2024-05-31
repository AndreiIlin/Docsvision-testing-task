import { Skeleton } from '@/shared/ui/loaders';
import { clsx } from 'clsx';
import type { FC } from 'react';

import styles from './BuildingsSkeleton.module.scss';

export const BuildingsSkeleton: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Skeleton />
      </div>
      <div className={clsx(styles.item, styles['mt-1'])}>
        <Skeleton />
      </div>
      <div className={clsx(styles.item, styles['mt-1'])}>
        <Skeleton />
      </div>
      <div className={clsx(styles.item, styles['mt-2'])}>
        <Skeleton />
      </div>
      <div className={styles.item}>
        <Skeleton />
      </div>
      <div className={clsx(styles.item, styles['mt-1'])}>
        <Skeleton />
      </div>
    </div>
  );
};
