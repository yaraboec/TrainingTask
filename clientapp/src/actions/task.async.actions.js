import axios from 'axios';
import join from 'url-join';
import {
  addTaskAction, addTasksAction, deleteTaskAction, updateTaskAction,
} from '../reducers/task.reducer';

axios.interceptors.request.use((config) => {
  const data = JSON.parse(localStorage.getItem('data'));
  const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

  if (!isAbsoluteURLRegex.test(config.url)) {
    config.url = join(process.env.REACT_APP_backConString, config.url);
  }

  if (data && data.token) {
    config.headers = { Authorization: `Bearer ${data.token}` };
  }

  return config;
});

export const fetchTasks = () => async function fetchInternal(dispatch) {
  await axios.get('/api/tasks/', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => dispatch(addTasksAction(response.data)));
};

export const addTask = (task) => async function addInternal(dispatch) {
  await axios.post('/api/tasks', task, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => dispatch(addTaskAction(response.data)));
};

export const updateTask = (task) => async function updateInternal(dispatch) {
  await axios.put(`/api/tasks/${task._id}`, task, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => dispatch(updateTaskAction(response.data)));
};

export const deleteTask = (id) => async function deleteInternal(dispatch) {
  await axios.delete(('/api/tasks/').concat(id), {
    method: 'DELETE',
  }).then((responce) => dispatch(deleteTaskAction(responce.data)));
};
