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
  await axios.post(process.env.REACT_APP_backConString.concat('/api/tasks'), task, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((responce) => dispatch(addTaskAction(responce.data)));
};

export const updateTask = (task) => async function (dispatch) {
  await axios.put(process.env.REACT_APP_backConString.concat(`/api/tasks/${task._id}`), task, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => dispatch(updateTaskAction(response.data)));
};

export const deleteTask = (id) => async function (dispatch) {
  await axios.delete(process.env.REACT_APP_backConString.concat('/api/tasks/').concat(id), {
    method: 'DELETE',
  }).then((responce) => dispatch(deleteTaskAction(responce.data)));
};
