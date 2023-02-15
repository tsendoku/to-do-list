import React from 'react';
import styles from './index.module.scss';
import { useToDoStore } from '../../data/stores/useToDoStore';
import { InputPlus } from '../components/InputPlus';
import { InputTask } from '../components/InputTask';

export const App: React.FC = () => {
  const [tasks, createTask, editTask, removeTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.editTask,
    state.removeTask,
  ]);
  return (
    <div className={styles.article}>
      <h1 className={styles.articleTitle}>To Do</h1>
      <section className={styles.articleSection}>
        <InputPlus
          onAdd={(title) => {
            if (title) {
              createTask(title);
            }
          }}
        />
      </section>
      <section className={styles.articleSection}>
        {!tasks.length && <p className={styles.articleText}>There is no tasks to do</p>}
        {tasks.map((task) => (
          <InputTask
            key={task.id}
            id={task.id}
            title={task.title}
            onDone={removeTask}
            onEdited={editTask}
            onRemoved={removeTask}
          />
        ))}
      </section>
    </div>
  );
};
