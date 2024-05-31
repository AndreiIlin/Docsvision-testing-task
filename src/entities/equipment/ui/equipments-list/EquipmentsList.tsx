import { routes } from '@/shared/routes';
import { $buildingsWithHierarchyStore } from '@/shared/store';
import { $equipmentsByIdStore } from '@/shared/store/equipments';
import { useUnit } from 'effector-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './EquipmentsList.module.scss';

interface EquipmentsListProps {
  buildingTitle: string;
  buildingId: string;
  isEditable: boolean;
  AddAction: FC<{ placeId: string }>;
  RemoveAction: FC<{ equipmentId: string }>;
  UpdateAction: FC<{
    placeId: string;
    equipmentId: string;
    name: string;
    count: number;
  }>;
}

export const EquipmentsList: FC<EquipmentsListProps> = ({
  isEditable,
  buildingId,
  buildingTitle,
  AddAction,
  RemoveAction,
  UpdateAction
}) => {
  const [equipmentsById, buildings] = useUnit([$equipmentsByIdStore, $buildingsWithHierarchyStore]);

  const equipmentsList = equipmentsById[buildingId];

  if (!equipmentsList && buildings.find((build) => build.id === buildingId)) return null;

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <Link className={styles.link} to={routes.getBuildingRoute(buildingId)}>
          <h3 className={styles.title}>{buildingTitle}</h3>
        </Link>
        {isEditable && <AddAction placeId={buildingId} />}
      </div>
      <div className={styles.body}>
        {equipmentsList ? (
          <ul className={styles.list}>
            {equipmentsList.map((equipment, idx) => (
              <li className={styles.item} key={equipment.id}>
                <div className={styles['item-info']}>
                  <p>
                    {idx + 1}. {equipment.data.name}
                  </p>
                  <p>кол-во: {equipment.data.count}</p>
                </div>
                {isEditable && (
                  <div className={styles['item-actions']}>
                    <UpdateAction
                      name={equipment.data.name}
                      equipmentId={equipment.id}
                      count={equipment.data.count}
                      placeId={buildingId}
                    />
                    <RemoveAction equipmentId={equipment.id} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>В данном строении еще нет оборудования</p>
        )}
      </div>
    </div>
  );
};
