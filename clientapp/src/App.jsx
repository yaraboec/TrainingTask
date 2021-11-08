import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  useEffect, useState,
} from 'react';
import List from './components/list.tasks';
import './App.css';
import {
  fetchTasks, addTask, deleteTask, updateTask,
} from './actions/task.async.actions';
import TaskCreateRequest from './models/create.task.model';
import TaskUpdateRequest from './models/update.task.model';

const App = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const addTaskFoo = () => {
    const task = new TaskCreateRequest(name, true);
    dispatch(addTask(task));
  };

  const removeTask = (task) => {
    dispatch(deleteTask(task._id));
  };

  const updateTaskFoo = (task) => {
    const taskModel = new TaskUpdateRequest(task._id, task.name, false);
    dispatch(updateTask(taskModel));
  };

  return (
    <div className="app">
      <List />
      <h1>{t('Welcome')}</h1>
      <div>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <button type="button" onClick={() => addTaskFoo()}>{t('Tasks.Buttons.Add')}</button>
      </div>
      {tasks.length > 0
        ? (
          <div>
            <div>
              <h2>{t('Tasks.Active')}</h2>
              {tasks.map((task) => (
                task.status === true && (
                <div>
                  <input type="text" value={task.name} />
                  <button type="button" onClick={() => updateTaskFoo(task)}>{t('Tasks.Buttons.Complete')}</button>
                </div>
                )))}
            </div>
            <div>
              <h2>{t('Tasks.Completed')}</h2>
              {tasks.map((task) => (
                task.status === false && (
                  <div>
                    <input type="text" value={task.name} />
                    <button type="button" onClick={() => removeTask(task)}>{t('Tasks.Buttons.Delete')}</button>
                  </div>
                )))}
            </div>
          </div>
        )
        : (
          <div style={{ fontSize: '2rem' }}>
            {t('Tasks.NoTask')}
          </div>
        )}
    </div>
  );
};

export default App;
