import { Skeleton } from '@/shared/ui/loaders';
import type { FC } from 'react';

import styles from './EquipmentsSkeleton.module.scss';

export const EquipmentsSkeleton: FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.item}>
            <Skeleton />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.item}>
            <Skeleton />
          </div>
          <div className={styles.item}>
            <Skeleton />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.item}>
            <Skeleton />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.item}>
            <Skeleton />
          </div>
          <div className={styles.item}>
            <Skeleton />
          </div>
        </div>
      </div>
    </div>
  );
};
