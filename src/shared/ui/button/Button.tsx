import { clsx } from 'clsx';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'danger';
  size?: 'normal' | 'large';
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  title,
  className,
  variant,
  size = 'normal',
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        {
          [styles.primary]: variant === 'primary',
          [styles.success]: variant === 'success',
          [styles.danger]: variant === 'danger',
          [styles.large]: size === 'large',
        },
        className,
      )}
      {...props}
    >
      {title}
      {children}
    </button>
  );
};
