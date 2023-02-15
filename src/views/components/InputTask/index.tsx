import React from 'react';
import styles from './index.module.scss';

interface InputTaskProps {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({ id, title, onDone, onEdited, onRemoved }) => {
  const [checked, setChecked] = React.useState(false);
  const [isEditedMode, setIsEditedMode] = React.useState(false);
  const [value, setValue] = React.useState(title);
  const editTitleInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditedMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditedMode]);

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          disabled={isEditedMode}
          checked={checked}
          className={styles.inputTaskCheckbox}
          onChange={(event) => {
            setChecked(event.target.checked);
            if (event.target.checked) {
              setTimeout(() => {
                onDone(id);
              }, 300);
            }
          }}
        />
        {isEditedMode ? (
          <input
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onEdited(id, value);
                setIsEditedMode(false);
              }
            }}
            ref={editTitleInputRef}
            className={styles.inputTaskTitleEdit}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>
      {isEditedMode ? (
        <button
          aria-label="Save"
          className={styles.inputTaskSaveButton}
          onClick={() => {
            onEdited(id, value);
            setIsEditedMode(false);
          }}
        />
      ) : (
        <button
          aria-label="Edit"
          className={styles.inputTaskEditButton}
          onClick={() => {
            setIsEditedMode(true);
          }}
        />
      )}
      <button
        aria-label="Remove"
        className={styles.inputTaskRemoveButton}
        onClick={() => {
          if (confirm('Are you sure you want to delete Task?')) {
            onDone(id);
          }
        }}
      />
    </div>
  );
};
