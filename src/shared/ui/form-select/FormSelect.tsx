import { SelectOption } from '@/shared/types/select';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import styles from './FormSelect.module.scss';

interface FormSelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  title: string;
}

export const FormSelect: FC<FormSelectProps> = ({ value, options, onChange, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelectClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectOption = (option: SelectOption) => () => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={styles.select} ref={selectRef}>
      <select value={value} className={styles.hidden}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p className={styles.label}>{title}</p>
      <div className={styles.field} onClick={handleSelectClick}>
        {selectedOption?.label}
      </div>
      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <div key={option.value} className={styles.option} onClick={handleSelectOption(option)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
