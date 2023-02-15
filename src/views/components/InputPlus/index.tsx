import React from 'react';
import styles from './index.module.scss';

interface InputPlusProps {
  onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = React.useState('');

  const addTask = React.useCallback(() => {
    onAdd(inputValue);
    setInputValue('');
  }, [inputValue]);
  return (
    <div className={styles.inputPlus}>
      <input
        type="text"
        maxLength="75"
        className={styles.inputPlusValue}
        placeholder="(>^_^)>"
        value={inputValue}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            addTask();
          }
        }}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
      <button onClick={addTask} aria-label="Add" className={styles.inputPlusButton} />
    </div>
  );
};
