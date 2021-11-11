import axios from 'axios';
import {
  addTaskAction, addTasksAction, deleteTaskAction, updateTaskAction,
} from '../reducers/task.reducer';

export const fetchTasks = (id) => async function (dispatch) {
  await axios.get(process.env.REACT_APP_backConString.concat('/api/tasks/'), {
    headers: {
      'Content-Type': 'application/json',
    },
    params: { idUser: id },
  })
    .then((response) => dispatch(addTasksAction(response.data)));
};

export const addTask = (task) => async function (dispatch) {
  await fetch(process.env.REACT_APP_backConString.concat('/api/tasks'), {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((responce) => responce.json())
    .then((json) => dispatch(addTaskAction(json)));
};

export const updateTask = (task) => async function (dispatch) {
  await fetch(process.env.REACT_APP_backConString.concat(`/api/tasks/${task._id}`), {
    method: 'PUT',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((json) => dispatch(updateTaskAction(json)));
};

export const deleteTask = (id) => async function (dispatch) {
  await fetch(process.env.REACT_APP_backConString.concat('/api/tasks/').concat(id), {
    method: 'DELETE',
  }).then((responce) => responce.json())
    .then((json) => dispatch(deleteTaskAction(json)));
};
