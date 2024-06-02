import { Button } from '@/shared/ui/button';
import type { ButtonHTMLAttributes, FC, SVGProps } from 'react';

import styles from './MenuButton.module.scss';

interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: FC<SVGProps<SVGSVGElement> & { title?: string | undefined }>;
}

export const MenuButton: FC<MenuButtonProps> = ({ Icon, ...props }) => {

  return (
    <Button className={styles.button} {...props}>
      <Icon className={styles.icon} />
    </Button>
  );
};
