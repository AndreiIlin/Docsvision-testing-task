import type { FC, InputHTMLAttributes } from 'react';

import styles from './FromField.module.scss';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: string;
}

export const FormField: FC<FormFieldProps> = ({ label, error, ...props }) => {
  return (
    <div className={styles.field}>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <input id={label} className={styles.input} type='text' {...props} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
