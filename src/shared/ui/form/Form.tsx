import { FC, FormHTMLAttributes, ReactNode } from 'react';

import styles from './Form.module.scss';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  title: string;
  children?: ReactNode;
  confirmNode: ReactNode;
  cancelNode?: ReactNode;
}

export const Form: FC<FormProps> = ({ title, children, cancelNode, confirmNode, ...props }) => {
  return (
    <form className={styles.form} {...props}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles['form-fields']}>{children}</div>
      <div className={styles.actions}>
        {confirmNode}
        {cancelNode}
      </div>
    </form>
  );
};
