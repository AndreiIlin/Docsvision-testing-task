import { routes } from '@/shared/routes';
import type { BuildingWithHierarchy } from '@/shared/types/building';
import { clsx } from 'clsx';
import type { FC } from 'react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from './BuildingsList.module.scss';

interface BuildingsListProps {
  buildings: BuildingWithHierarchy[];
  isChild?: boolean;
}

export const BuildingsList: FC<BuildingsListProps> = ({ buildings, isChild = false }) => {
  const params = useParams();

  return (
    <ul
      className={clsx(styles.list, {
        [styles.child]: isChild
      })}
    >
      {buildings.map((building) => (
        <React.Fragment key={building.id}>
          <Link className={styles.link} to={routes.getBuildingRoute(building.id)}>
            <li className={styles['list-item']}>
              <div
                className={clsx(styles.indicator, {
                  [styles['not-empty']]: !building.isEmpty
                })}
              ></div>
              <h4
                className={clsx(styles.title, {
                  [styles.isActive]: building.id === params.id
                })}
              >
                {building.data?.name}
              </h4>
            </li>
          </Link>
          {!!building.parts.length && <BuildingsList buildings={building.parts} isChild />}
        </React.Fragment>
      ))}
    </ul>
  );
};
