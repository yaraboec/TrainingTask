import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Tabs, Tab, Form, Row, Col,
} from 'react-bootstrap';
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
  const [isVisible, setVisibility] = useState(false);
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

  const handlerSelect = (e) => {
    if (e === 'active') {
      setVisibility(false);
    } else {
      setVisibility(true);
    }
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
        <Button
          variant="secondary"
          type="button"
          style={{ marginLeft: '20px', marginBottom: '6px' }}
          onClick={() => {
            addTaskFoo();
            addToast(t('Toaster.Add'), {
              appearance: 'success',
              autoDismiss: true,
            });
          }}
        >
          {t('Tasks.Buttons.Add')}
        </Button>
        {tasks.length > 0
        && (
        <Button
          hidden={isVisible}
          type="button"
          style={{ marginLeft: '20px', marginBottom: '6px', width: '70px' }}
          onClick={() => setInputState(!inputState)}
        >
          {t('Tasks.Buttons.Edit')}
        </Button>
        )}
      </div>
      {tasks.length > 0
        ? (
          <Tabs
            defaultActiveKey="active"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={(event) => handlerSelect(event)}
          >
            <Tab eventKey="active" title={t('Tasks.Active')}>
              <div />
              {tasks.map((task) => (
                task.status === true && (
                  <Form>
                    <Row className="justify-content-md-center" style={{ marginLeft: '100px', marginTop: '20px' }}>
                      <Col lg={2}>
                        <Form.Control
                          type="text"
                          defaultValue={task.name}
                          onChange={(e) => setInputUpdateName(e.target.value)}
                          readOnly={inputState}
                        />
                      </Col>
                      <Col lg={2}>
                        <Button
                          type="button"
                          variant="success"
                          onClick={() => {
                            completeTask(task);
                            addToast(t('Toaster.Complete'), {
                              appearance: 'success',
                              autoDismiss: true,
                            });
                          }}
                        >
                          {t('Tasks.Buttons.Complete')}
                        </Button>
                      </Col>
                      <Col lg={1}>
                        <Button
                          type="button"
                          variant="success"
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
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )))}
            </Tab>
            <Tab eventKey="completed" title={t('Tasks.Completed')}>
              {tasks.map((task) => (
                task.status === false && (
                  <Form>
                    <Row className="justify-content-md-center" style={{ marginTop: '20px' }}>
                      <Col lg={2}>
                        <Form.Control type="text" value={task.name} />
                      </Col>
                      <Col lg={2}>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => {
                            removeTask(task);
                            addToast(t('Toaster.Delete'), {
                              appearance: 'success',
                              autoDismiss: true,
                            });
                          }}
                        >
                          {t('Tasks.Buttons.Delete')}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )))}
            </Tab>
          </Tabs>
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
