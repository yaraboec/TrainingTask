import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  useEffect, useState, useContext,
} from 'react';
import './App.css';
import { useToasts } from 'react-toast-notifications';
import {
  fetchTasks, addTask, deleteTask, updateTask,
} from './actions/task.async.actions';
import TaskCreateRequest from './models/create.task.model';
import TaskUpdateRequest from './models/update.task.model';
import AuthService from './services/auth.service';

const App = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { idUser } = useContext(AuthService);
  const [inputState, setInputState] = useState(true);
  const [inputUpdateName, setInputUpdateName] = useState('');
  const [name, setName] = useState('');
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks(idUser));
  }, [dispatch, idUser]);

  const addTaskFoo = () => {
    const task = new TaskCreateRequest(name, true, idUser);
    dispatch(addTask(task));
  };

  const removeTask = (task) => {
    dispatch(deleteTask(task._id));
  };

  const completeTask = (task) => {
    const taskModel = new TaskUpdateRequest(task._id, task.name, false, idUser);
    dispatch(updateTask(taskModel));
  };

  const updateTaskFoo = (task) => {
    const taskModel = new TaskUpdateRequest(task._id, inputUpdateName, task.status, idUser);
    dispatch(updateTask(taskModel));
  };

  return (
    <div className="app" style={{ textAlign: 'center' }}>
      <h1>{t('Welcome')}</h1>
      <div>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <button
          type="button"
          onClick={() => {
            addTaskFoo();
            addToast(t('Toaster.Add'), {
              appearance: 'success',
              autoDismiss: true,
            });
          }}
        >
          {t('Tasks.Buttons.Add')}
        </button>
      </div>
      {tasks.length > 0
        ? (
          <div>
            <div>
              <div style={{ display: 'inline-flex' }}>
                <h2>{t('Tasks.Active')}</h2>
                <button
                  style={{
                    height: '30px', width: '150px', marginTop: '23px', marginLeft: '30px',
                  }}
                  type="button"
                  onClick={() => setInputState(!inputState)}
                >
                  {t('Tasks.Buttons.Edit')}
                </button>

              </div>
              {tasks.map((task) => (
                task.status === true && (
                  <div>
                    <input type="text" defaultValue={task.name} onChange={(e) => setInputUpdateName(e.target.value)} readOnly={inputState} />
                    <button
                      type="button"
                      onClick={() => {
                        completeTask(task);
                        addToast(t('Toaster.Complete'), {
                          appearance: 'success',
                          autoDismiss: true,
                        });
                      }}
                    >
                      {t('Tasks.Buttons.Complete')}
                    </button>
                    <button
                      type="button"
                      hidden={inputState}
                      onClick={() => {
                        updateTaskFoo(task);
                        setInputState(true);
                        addToast(t('Toaster.Update'), {
                          appearance: 'success',
                          autoDismiss: true,
                        });
                      }}
                    >
                      {t('Tasks.Buttons.Save')}
                    </button>
                  </div>
                )))}
            </div>
            <div>
              <h2>{t('Tasks.Completed')}</h2>
              {tasks.map((task) => (
                task.status === false && (
                  <div>
                    <input type="text" value={task.name} />
                    <button
                      type="button"
                      onClick={() => {
                        removeTask(task);
                        addToast(t('Toaster.Delete'), {
                          appearance: 'success',
                          autoDismiss: true,
                        });
                      }}
                    >
                      {t('Tasks.Buttons.Delete')}

                    </button>
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
