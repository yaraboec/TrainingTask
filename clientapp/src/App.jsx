import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import List from './components/list.tasks';
import './App.css';
import fetchTasks, { addTask, deleteTask, updateTask } from './actions/task.async.actions';
import TaskCreateRequest from './models/create.task.model';
import TaskUpdateRequest from './models/update.task.model';

const App = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const addTaskFoo = (info) => {
    const task = new TaskCreateRequest(info, true);
    dispatch(addTask(task));
  };

  const removeTask = (task) => {
    // eslint-disable-next-line no-underscore-dangle
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
        <button type="button" onClick={() => addTaskFoo(prompt())}>Добавить задание</button>
      </div>
      {tasks.length > 0
        ? (
          <div>
            {tasks.map((task) => (
              <div>
                <input type="text" value={task.name} />
                <button type="button" onClick={() => removeTask(task)}>Удалить задание</button>
                <button type="button" onClick={() => updateTaskFoo(task)}>Завершить задание</button>
              </div>
            ))}
          </div>
        )
        : (
          <div style={{ fontSize: '2rem' }}>
            Заданий нет!
          </div>
        )}
    </div>
  );
};

export default App;
