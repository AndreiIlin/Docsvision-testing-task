import type { FC, ReactNode, SyntheticEvent } from 'react';
import { useEffect, useRef } from 'react';

import styles from './ModalLayout.module.scss';

interface ModalLayoutProps {
  closeModal: () => void;
  children: ReactNode;
}

export const ModalLayout: FC<ModalLayoutProps> = ({ closeModal, children }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (overlay.current && frame.current) {
        overlay.current.style.alignItems =
          overlay.current.clientHeight < frame.current.clientHeight ? 'flex-start' : 'center';
        overlay.current.style.justifyContent =
          overlay.current.clientWidth < frame.current.clientWidth ? 'flex-start' : 'center';
        frame.current.style.transform = 'translate(0, 0)';
      }
    });
    if (overlay.current) {
      resizeObserver.observe(overlay.current);
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
      resizeObserver.disconnect();
    };
  }, []);

  const handleCloseOnOverlay = (e: SyntheticEvent<HTMLDivElement>) => {
    if (e.target === overlay.current) closeModal();
  };

  return (
    <div ref={overlay} onClick={handleCloseOnOverlay} className={styles['modal-layout']}>
      <div className={styles.frame} ref={frame}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
