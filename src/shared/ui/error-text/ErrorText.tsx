import { routes } from '@/shared/routes';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './ErrorText.module.scss';

interface ErrorTextProps {
  pathname: string;
}

export const ErrorText: FC<ErrorTextProps> = ({ pathname }) => {
  return (
    <>
      {pathname === '/500' && (
        <>
          <h2 className={styles.title}>Произошла ошибка на сервере!</h2>
          <p className={styles.subtitle}>
            Вернитесь{' '}
            <Link className={styles.link} to={routes.main}>
              на Главную страницу
            </Link>{' '}
            и перезагрузите страницу
          </p>
        </>
      )}
      {pathname === '/404' && (
        <>
          <h2 className={styles.title}>Страница не найдена!</h2>
          <p className={styles.subtitle}>
            Вернуться{' '}
            <Link className={styles.link} to={routes.main}>
              На Главную страницу
            </Link>
          </p>
        </>
      )}
    </>
  );
};
